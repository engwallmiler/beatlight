const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Exercise the standalone HTML without dependencies. Canvas calls are recorded;
// appearance and native pointer behavior still require a browser check.
const html = fs.readFileSync(path.join(__dirname, '..', 'beatlight_pixel_studio.html'), 'utf8');
const source = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const plain = value => JSON.parse(JSON.stringify(value));
const line = (overrides = {}) => ({ name: 'Perfil teste', start: { x: 100, y: 100 }, end: { x: 600, y: 400 }, meters: 2.5, leds: 7, pixels: 5, ...overrides });

function studio({ storage = new Map(), storageUnavailable = false } = {}) {
  const canvases = [], errors = [], frames = [], downloads = [], blobs = new Map();
  class Element {
    constructor(tag = 'div') {
      this.tagName = tag.toUpperCase(); this.children = []; this.listeners = {};
      this.value = ''; this.textContent = ''; this.dataset = {}; this.attributes = {};
      this.width = 1200; this.height = 560;
      const classes = new Set();
      this.classList = { toggle: (name, on) => { if (on) classes.add(name); else classes.delete(name); }, contains: name => classes.has(name) };
    }
    appendChild(child) { this.children.push(child); return child; }
    replaceChildren(...children) { this.children = children; }
    setAttribute(name, value) { this.attributes[name] = String(value); }
    addEventListener(name, callback) { (this.listeners[name] ||= []).push(callback); }
    dispatch(name, values = {}) {
      const event = { target: this, preventDefault() {}, button: 0, pointerId: 1, ...values };
      for (const callback of this.listeners[name] || []) callback(event);
      return this['on' + name]?.(event);
    }
    click() { if (this.tagName === 'A') downloads.push(this); return this.dispatch('click'); }
    remove() {}
    setPointerCapture() {}
    releasePointerCapture() {}
    getBoundingClientRect() { return { left: 0, top: 0, width: 600, height: 280 }; }
    getContext() {
      if (this.context) return this.context;
      const calls = [];
      const context = { calls, createImageData: (w, h) => ({ data: new Uint8ClampedArray(w * h * 4) }), createRadialGradient: () => ({ addColorStop() {} }), createLinearGradient: () => ({ addColorStop() {} }) };
      for (const name of ['clearRect', 'fillRect', 'fillText', 'beginPath', 'closePath', 'moveTo', 'lineTo', 'bezierCurveTo', 'stroke', 'arc', 'fill', 'save', 'restore', 'translate', 'rotate', 'scale', 'drawImage', 'putImageData']) context[name] = (...args) => calls.push({ name, args });
      this.context = context; canvases.push(this); return context;
    }
  }
  const elements = new Map();
  for (const match of html.matchAll(/<([\w-]+)\b([^>]*\bid="([^"]+)"[^>]*)>/g)) {
    const element = new Element(match[1]);
    element.value = match[2].match(/\bvalue="([^"]*)"/)?.[1] || '';
    elements.set(match[3], element);
  }
  elements.get('columns').value = '6';
  const document = { body: new Element('body'), activeElement: null, getElementById: id => { assert.ok(elements.has(id), `Missing element: ${id}`); return elements.get(id); }, createElement: tag => new Element(tag), addEventListener() {}, querySelectorAll: selector => selector === '#modeButtons button' ? elements.get('modeButtons').children : [] };
  const context = vm.createContext({ document, Float32Array, Uint8ClampedArray, Blob,
    URL: { createObjectURL: blob => { const url = `blob:test-${blobs.size}`; blobs.set(url, blob); return url; }, revokeObjectURL() {} },
    localStorage: { getItem: key => { if (storageUnavailable) throw Error('Storage blocked'); return storage.get(key) || null; }, setItem: (key, value) => { if (storageUnavailable) throw Error('Storage blocked'); storage.set(key, value); } },
    performance: { now: () => 0 }, requestAnimationFrame: callback => frames.push(callback), setTimeout() {}, console: { error: (...args) => errors.push(args) }
  });
  // Read internals only in the isolated test copy, leaving the HTML API private.
  vm.runInContext(source.replace(/\}\)\(\);\s*$/, 'globalThis.inspect={get lines(){return lines},get resources(){return lineResources},state,drawColumns,capturePattern,sampleDescriptor,selectMode,pathPoint,measurePath,pointAtDistance,infinityLines};})();'), context);
  const $ = id => elements.get(id);
  const importLines = async candidate => {
    $('importGeometryFile').files = [{ size: 1000, text: async () => JSON.stringify({ version: 1, lines: candidate }) }];
    await $('importGeometryFile').dispatch('change');
  };
  return { $, api: context.inspect, errors, frames, storage, importLines, downloads, blobs, canvases };
}

test('initial geometry renders and editing changes physical totals and pixel allocation', () => {
  const app = studio(), { $, api } = app;
  assert.equal(api.lines.length, 6);
  app.frames.shift()(16);
  assert.deepEqual(app.errors, []);
  for (const [id, value] of Object.entries({ lineName: 'Diagonal', lineStartX: '10.25', lineStartY: '20.5', lineEndX: '1100', lineEndY: '500', lineMeters: '2.5', lineLeds: '7', linePixels: '5' })) $(id).value = value;
  $('lineForm').dispatch('submit');
  assert.deepEqual(plain(api.lines[0]), line({ name: 'Diagonal', start: { x: 10.25, y: 20.5 }, end: { x: 1100, y: 500 } }));
  assert.equal(api.resources[0].channels.length, 20);
  assert.match($('totalRead').textContent, /27,5 m.*3\.007 LEDs.*1\.005 pixels/);
  assert.match($('lineDensity').textContent, /1 a 2 LEDs\/pixel/);
  assert.ok(app.storage.has('beatlight.geometry.v1'));
});

test('invalid form changes are rejected without changing the geometry or saved copy', () => {
  const app = studio(), { $, api } = app;
  $('lineForm').dispatch('submit');
  const saved = app.storage.get('beatlight.geometry.v1');
  for (const [id, value] of [['linePixels', '601'], ['lineLeds', '2.5'], ['lineMeters', '0'], ['lineStartX', '-1']]) {
    const original = $(id).value; $(id).value = value;
    $('lineForm').dispatch('submit');
    assert.equal(app.storage.get('beatlight.geometry.v1'), saved);
    assert.ok($('geometryStatus').classList.contains('error'));
    $(id).value = original;
  }
  assert.equal(api.lines[0].leds, 600);
});

test('two clicks create a line using scaled canvas coordinates; reverse, drag, cancel and delete work', () => {
  const app = studio(), { $, api } = app, canvas = $('geometryCanvas');
  $('drawLineBtn').click();
  canvas.dispatch('pointerdown', { clientX: 50, clientY: 100 });
  canvas.dispatch('pointermove', { clientX: 400, clientY: 120 });
  canvas.dispatch('pointerdown', { clientX: 400, clientY: 120 });
  assert.equal(api.lines.length, 7);
  assert.deepEqual(plain(api.lines[6].start), { x: 100, y: 200 });
  assert.deepEqual(plain(api.lines[6].end), { x: 800, y: 240 });
  $('reverseLineBtn').click();
  assert.deepEqual(plain(api.lines[6].start), { x: 800, y: 240 });
  canvas.dispatch('pointerdown', { clientX: 400, clientY: 120 });
  canvas.dispatch('pointermove', { clientX: 350, clientY: 130 });
  canvas.dispatch('pointercancel');
  assert.deepEqual(plain(api.lines[6].start), { x: 800, y: 240 });
  canvas.dispatch('pointerdown', { clientX: 400, clientY: 120 });
  canvas.dispatch('pointerup', { clientX: 350, clientY: 130 });
  assert.deepEqual(plain(api.lines[6].start), { x: 700, y: 260 });
  $('deleteLineBtn').click();
  assert.equal(api.lines.length, 6);
});

test('JSON import validates the entire candidate and export round-trips applied geometry', async () => {
  const app = studio(), { $, api } = app;
  const invalid = [[], [line({ pixels: 8 })], [line({ start: { x: 600, y: 400 } })], [line({ end: { x: Infinity, y: 0 } })], Array.from({ length: 33 }, () => line()), Array.from({ length: 9 }, () => line({ leds: 4096, pixels: 1 })), Array.from({ length: 5 }, () => line({ leds: 2048, pixels: 2048 }))];
  for (const candidate of invalid) { await app.importLines(candidate); assert.equal(api.lines.length, 6); assert.ok($('geometryStatus').classList.contains('error')); }
  const candidate = [line(), line({ name: 'Pixel único', start: { x: 100, y: 450 }, end: { x: 1000, y: 450 }, leds: 10, pixels: 1 })];
  await app.importLines(candidate);
  assert.deepEqual(plain(api.lines), candidate);
  $('exportGeometryBtn').click();
  const exported = JSON.parse(await app.blobs.get(app.downloads[0].href).text());
  assert.deepEqual(exported, { version: 1, lines: candidate });
  const restored = studio({ storage: app.storage });
  assert.deepEqual(plain(restored.api.lines), candidate);
  assert.equal($('importGeometryFile').value, '');
});

test('storage failure and corrupt saved JSON keep the editor usable', async () => {
  const app = studio({ storageUnavailable: true });
  await app.importLines([line()]);
  assert.equal(app.api.lines.length, 1);
  assert.match(app.$('geometryStatus').textContent, /Armazenamento indisponível/);
  app.api.drawColumns();
  assert.deepEqual(app.errors, []);
  const corrupt = studio({ storage: new Map([['beatlight.geometry.v1', '{bad json']]) });
  assert.equal(corrupt.api.lines.length, 6);
  assert.ok(corrupt.$('geometryStatus').classList.contains('error'));
});

test('arbitrary line angles, uneven LED groups, RGBW and a single pixel render finite output', async () => {
  const app = studio(), { api } = app;
  await app.importLines([line(), line({ leds: 10, pixels: 1, start: { x: 50, y: 100 }, end: { x: 1000, y: 100 } })]);
  api.state.colorMode = 'rgbw'; api.state.white = 1;
  api.drawColumns();
  for (const resource of api.resources) {
    assert.ok([...resource.channels].every(Number.isFinite));
    assert.equal(resource.texture.data.length, resource.canvas.height * 9 * 4);
    for (let pixel = 0; pixel < resource.channels.length / 4; pixel++) {
      assert.equal(resource.channels[pixel * 4], 0);
      assert.equal(resource.channels[pixel * 4 + 1], 0);
      assert.equal(resource.channels[pixel * 4 + 2], 0);
    }
  }
  const row = (resource, index) => [...resource.texture.data.slice(index * 36, (index + 1) * 36)];
  assert.deepEqual(row(api.resources[0], 0), row(api.resources[0], 1));
  assert.deepEqual(row(api.resources[0], 3), row(api.resources[0], 4));
  for (let led = 1; led < 10; led++) assert.deepEqual(row(api.resources[1], 0), row(api.resources[1], led));
  const light = app.canvases.find(canvas => canvas.context.calls.some(call => call.name === 'rotate'));
  const rotations = light.context.calls.filter(call => call.name === 'rotate').map(call => call.args[0]);
  assert.ok(rotations.every(Number.isFinite));
  assert.equal(rotations.at(-1), -Math.PI / 2);
  assert.equal(light.context.globalCompositeOperation, 'screen');
  api.state.brightness = 0; api.drawColumns();
  assert.ok(api.resources.every(resource => [...resource.channels].every(value => value === 0)));
});

test('interrupted transitions retain each line resolution and survive a geometry change', async () => {
  const app = studio(), { api } = app;
  await app.importLines([line({ leds: 2048, pixels: 2048 }), line({ pixels: 1 })]);
  api.selectMode('wave'); api.state.elapsed += 0.2; api.selectMode('comet');
  const snapshot = api.capturePattern();
  assert.equal(snapshot.strips[0].length, 2048 * 4);
  assert.equal(snapshot.strips[1].length, 4);
  for (const u of [0, .5, 1]) assert.ok(api.sampleDescriptor(snapshot, 0, u, 1).every(Number.isFinite));
  await app.importLines([line({ pixels: 1 })]);
  api.drawColumns();
  assert.ok([...api.resources[0].channels].every(Number.isFinite));
  assert.equal(app.$('deleteLineBtn').disabled, true);
  app.$('deleteLineBtn').click(); assert.equal(api.lines.length, 1);
  app.$('columns').value = '4'; app.$('resetGeometryBtn').click();
  assert.equal(api.lines.length, 4); assert.equal(api.state.columns, 4);
});

test('infinity template closes smoothly, exports version 2 and survives reload and undo', async () => {
  const app = studio(), { $, api } = app, initial = plain(api.lines);
  $('infinityTemplateBtn').click();
  assert.equal(api.lines.length, 4);
  assert.match($('totalRead').textContent, /20 m.*2\.400 LEDs.*800 pixels/);
  for (let i = 0; i < 4; i++) {
    const a = api.lines[i], b = api.lines[(i + 1) % 4];
    assert.deepEqual(plain(a.end), plain(b.start));
    assert.deepEqual([a.end.x - a.control2.x, a.end.y - a.control2.y], [b.control1.x - b.start.x, b.control1.y - b.start.y]);
    assert.equal(a.leds, 600); assert.equal(a.pixels, 200);
  }
  $('exportGeometryBtn').click();
  const exported = JSON.parse(await app.blobs.get(app.downloads[0].href).text());
  assert.equal(exported.version, 2);
  assert.deepEqual(exported, JSON.parse(fs.readFileSync(path.join(__dirname, '../templates/infinito.json'), 'utf8')));
  assert.deepEqual(plain(studio({ storage: app.storage }).api.lines), exported.lines);
  const imported = studio();
  imported.$('importGeometryFile').files = [{ size: 2000, text: async () => JSON.stringify(exported) }];
  await imported.$('importGeometryFile').dispatch('change');
  assert.deepEqual(plain(imported.api.lines), exported.lines);
  $('undoGeometryBtn').click();
  assert.deepEqual(plain(api.lines), initial);
  assert.equal($('undoGeometryBtn').disabled, true);
});

test('curve creation, control dragging, reversal and conversion preserve expected shape', () => {
  const { $, api } = studio(), canvas = $('geometryCanvas');
  $('drawCurveBtn').click();
  canvas.dispatch('pointerdown', { clientX: 50, clientY: 50 });
  canvas.dispatch('pointermove', { clientX: 400, clientY: 150 });
  canvas.dispatch('pointerdown', { clientX: 400, clientY: 150 });
  assert.equal(api.lines[6].type, 'bezier');
  assert.equal($('curveFields').hidden, false);
  const c1 = plain(api.lines[6].control1);
  canvas.dispatch('pointerdown', { clientX: c1.x / 2, clientY: c1.y / 2 });
  canvas.dispatch('pointermove', { clientX: 150, clientY: 230 });
  canvas.dispatch('pointercancel');
  assert.deepEqual(plain(api.lines[6].control1), c1);
  canvas.dispatch('pointerdown', { clientX: c1.x / 2, clientY: c1.y / 2 });
  canvas.dispatch('pointerup', { clientX: 150, clientY: 230 });
  assert.deepEqual(plain(api.lines[6].control1), { x: 300, y: 460 });
  const before = plain(api.lines[6]);
  $('reverseLineBtn').click();
  for (let i = 0; i <= 10; i++) {
    const a = api.pathPoint(before, i / 10), b = api.pathPoint(api.lines[6], 1 - i / 10);
    assert.ok(Math.hypot(a.x - b.x, a.y - b.y) < 1e-9);
  }
  $('lineType').value = 'line'; $('lineType').dispatch('change'); $('lineForm').dispatch('submit');
  assert.equal(api.lines[6].type, undefined); assert.equal($('curveFields').hidden, true);
  $('lineType').value = 'bezier'; $('lineType').dispatch('change'); $('lineForm').dispatch('submit');
  assert.equal(api.lines[6].type, 'bezier');
});

test('curve validation rejects corrupt handles atomically and accepts nondegenerate closed curves', async () => {
  const app = studio(), { $, api } = app;
  $('infinityTemplateBtn').click();
  const saved = app.storage.get('beatlight.geometry.v1'), curve = plain(api.lines[0]);
  for (const bad of [{ ...curve, control1: undefined }, { ...curve, control2: { x: 1201, y: 10 } }, { ...curve, type: 'unknown' }]) {
    await app.importLines([bad]);
    assert.equal(app.storage.get('beatlight.geometry.v1'), saved);
    assert.ok($('geometryStatus').classList.contains('error'));
  }
  await app.importLines([{ ...curve, end: curve.start }]);
  assert.equal(api.lines.length, 1);
  api.drawColumns(); assert.ok([...api.resources[0].channels].every(Number.isFinite));
});

test('curved render follows equal arc distances, keeps RGBW channels and extinguishes at zero brightness', () => {
  const app = studio(), { $, api } = app;
  $('infinityTemplateBtn').click();
  const route = api.resources[0].route;
  const lengths = route.slice(1).map((p, i) => Math.hypot(p.x - route[i].x, p.y - route[i].y));
  assert.ok(Math.max(...lengths) / Math.min(...lengths) < 1.01);
  assert.ok(route.some(p => p.y > 400));
  api.state.colorMode = 'rgbw'; api.state.white = 1; api.state.running = false; api.selectMode('ambient');
  api.drawColumns();
  for (const r of api.resources) {
    assert.ok([...r.channels].some(v => v > 0));
    assert.ok([...r.channels].every((v, i) => Number.isFinite(v) && (i % 4 === 3 || v === 0)));
  }
  const light = app.canvases.find(c => c.context.calls.some(call => call.name === 'drawImage' && call.args.length === 9));
  assert.ok(light);
  assert.ok(light.context.calls.filter(c => c.name === 'drawImage').every(c => c.args.slice(1).every(Number.isFinite)));
  api.state.brightness = 0; api.drawColumns();
  assert.ok(api.resources.every(r => [...r.channels].every(v => v === 0)));
});
