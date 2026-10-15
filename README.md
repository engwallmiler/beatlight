# BeatLight Pixel Studio

Demonstração visual de mangueiras de LED no escuro, com vinte efeitos e ritmo gerado internamente. Não requer música, microfone, hardware, internet ou instalação.

Abra `beatlight_pixel_studio.html` diretamente no Chrome, Edge ou Firefox. A apresentação inicia automaticamente. Se uma prévia do editor ou do repositório mostrar uma imagem parada ou um aviso sobre JavaScript, baixe/abra o arquivo no navegador.

Cada barra tem **600 LEDs em 200 pixels controláveis**, com três LEDs compartilhando a cor de cada pixel. É possível exibir 4, 5, 6 ou 8 barras. O difusor suaviza os pontos de luz; o brilho pode ser reduzido até apagar a emissão.

Use AUTO SHOW para percorrer as cenas, ou escolha um efeito individual. O BPM determina o ritmo simulado e a duração dos compassos; Velocidade ajusta o movimento dos efeitos. Kick e Clap adicionam acentos manuais; Drop arma uma sequência completa. Espaço pausa/reproduz, K e C adicionam acentos, D arma/cancela/encerra o drop, e N avança a cena quando o foco está fora dos controles.

A apresentação inicia no modo **ORGÂNICO**. Ele sorteia pares de padrões e varia lentamente sua posição, fase, rastro e cor. O padrão principal percorre uma lista embaralhada sem repetição imediata. **Variação** controla o quanto os padrões se deformam e se misturam; **Nova combinação orgânica** cria outro par e entra nesse modo a partir de qualquer cena.

**Transição** ajusta a passagem entre padrões de 1 a 12 segundos, com aceleração e desaceleração suaves. Os dois padrões continuam animados durante a passagem. AUTO SHOW, ORGÂNICO, seleção manual, timeline e Próxima cena usam essa mesma fusão de luz e cor, sem disparar um Drop automaticamente. Se outra cena for escolhida no meio da transição, a nova passagem parte da mistura visível, sem corte.

O intervalo em compassos determina quando começa a próxima troca automática. A duração da transição é limitada a 85% desse intervalo para reservar um momento de estabilidade. Alterar BPM ou duração das cenas não reinicia o relógio. Pausar congela inclusive a transição; selecionar uma cena enquanto pausado mostra sua prévia imediatamente. Reiniciar mantém o modo selecionado e, em ORGÂNICO, cria uma nova combinação.

Efeitos: Atmosfera, Kick Pulse, Chase, Espelhamento, Onda Vertical, Helix, Pixel Rain, Drop Impact, Cometa, Scanner, Estrelas, Meteoros, Chamas, Arco-íris, Blocos, Ping-pong, Ondas Centrais, Equalizador, Serpentina e Aurora. Chamas e Arco-íris usam cores próprias; os demais seguem a paleta. O Equalizador usa níveis sintéticos, sem análise musical.

Em **Tipo de LED**, escolha RGB ou RGBW. O modo RGBW calcula quatro canais por pixel, incluindo um emissor branco dedicado. **Mistura W** distribui a luz entre RGB e branco: 0% mantém somente RGB, 100% usa somente W. Escolha branco quente, neutro ou frio. As tonalidades são aproximações visuais para a tela, não uma calibração de uma fita física. A resolução continua em 200 pixels e 600 LEDs por barra nos dois modos.

Os pixels apagados emitem exatamente zero em todos os canais. O palco não tem iluminação ambiente nem desenho visível da mangueira apagada. Somente os pixels acesos geram difusão e reflexos próximos; os acentos manuais respeitam as regiões apagadas.

O **Kick automático** usa o relógio do BPM, com força ajustável, a cada beat ou somente no primeiro tempo. O primeiro beat recebe um acento maior. Escolha compassos 3/4, 4/4 ou 6/4; o marcador visual mostra os tempos. O kick modula apenas os pixels já acesos e pode ser desligado para recuperar o movimento orgânico sem pulsação.

**DROP SHOW / Armar drop** agenda a entrada para o primeiro tempo do próximo compasso. As sequências **Impacto**, **Turbo** e **Prisma** combinam pulsos, perseguições rápidas, cruzamentos e rajadas em frases de quatro compassos. Escolha duração de 4, 8 ou 16 compassos, 1/2/4 passos por beat e Energia. O término retorna suavemente ao padrão e modo anteriores. Clicar de novo cancela a espera ou encerra o drop; escolher outro modo também o cancela. A pausa congela a contagem. O compasso fica bloqueado durante a execução, e as escolhas de sequência, duração e passos se aplicam ao próximo drop armado. Reiniciar encerra o drop e reinicia o modo anterior.

Há **15 paletas**, incluindo vermelho intenso, verde puro, azul elétrico, magenta, ciano, âmbar, RGB primárias e neon. **Comportamento de cor** oferece as cores originais do efeito, espectro contínuo, troca por beat, troca por compasso ou uma cor personalizada fixa. Vermelho intenso em RGB mantém verde e azul zerados; misturar W torna a cor mais clara.

O palco tem exatamente **dois flashes RGBW sincronizados**, um em cada canto superior. Eles compartilham o mesmo pulso, cor e intensidade e disparam sempre juntos. Por padrão, participam só do drop; também podem acompanhar as batidas normais ou apenas o primeiro tempo. Turbo e Prisma usam subdivisões de meio beat. Escolha RGBW, RGB saturado ou branco, e ajuste a intensidade. Em 100%, a energia do pulso tem ganho de quatro vezes, com núcleo muito brilhante, halo amplo, dispersão no palco e reflexo óptico horizontal. Toda essa luz desaparece ao fim do pulso. **Flashes: desligados** apaga ambos imediatamente sem parar as mangueiras. O brilho geral também atua nos flashes. Eles usam o mesmo BPM, compasso e pausa da animação, sem áudio ou hardware.
