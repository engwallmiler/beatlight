# BeatLight Pixel Studio

Demonstração visual de mangueiras de LED no escuro, com vinte efeitos e ritmo gerado internamente. Não requer música, microfone, hardware, internet ou instalação.

Abra `beatlight_pixel_studio.html` diretamente no Chrome, Edge ou Firefox. A apresentação inicia automaticamente. Se uma prévia do editor ou do repositório mostrar uma imagem parada ou um aviso sobre JavaScript, baixe/abra o arquivo no navegador.

Cada barra tem **600 LEDs em 200 pixels controláveis**, com três LEDs compartilhando a cor de cada pixel. É possível exibir 4, 5, 6 ou 8 barras. O difusor suaviza os pontos de luz; o brilho pode ser reduzido até apagar a emissão.

Use AUTO SHOW para percorrer as cenas, ou escolha um efeito individual. O BPM determina o ritmo simulado e a duração dos compassos; Velocidade ajusta o movimento dos efeitos. Kick, Clap e Drop adicionam acentos visuais. Espaço pausa/reproduz e K, C, D, N acionam os efeitos e a próxima cena quando o foco está fora dos controles.

A apresentação inicia no modo **ORGÂNICO**. Ele sorteia pares de padrões e varia lentamente sua posição, fase, rastro e cor. O padrão principal percorre uma lista embaralhada sem repetição imediata. **Variação** controla o quanto os padrões se deformam e se misturam; **Nova combinação orgânica** cria outro par e entra nesse modo a partir de qualquer cena.

**Transição** ajusta a passagem entre padrões de 1 a 12 segundos, com aceleração e desaceleração suaves. Os dois padrões continuam animados durante a passagem. AUTO SHOW, ORGÂNICO, seleção manual, timeline e Próxima cena usam essa mesma fusão de luz e cor, sem disparar um Drop automaticamente. Se outra cena for escolhida no meio da transição, a nova passagem parte da mistura visível, sem corte.

O intervalo em compassos determina quando começa a próxima troca automática. A duração da transição é limitada a 85% desse intervalo para reservar um momento de estabilidade. Alterar BPM ou duração das cenas não reinicia o relógio. Pausar congela inclusive a transição; selecionar uma cena enquanto pausado mostra sua prévia imediatamente. Reiniciar mantém o modo selecionado e, em ORGÂNICO, cria uma nova combinação.

Efeitos: Atmosfera, Kick Pulse, Chase, Espelhamento, Onda Vertical, Helix, Pixel Rain, Drop Impact, Cometa, Scanner, Estrelas, Meteoros, Chamas, Arco-íris, Blocos, Ping-pong, Ondas Centrais, Equalizador, Serpentina e Aurora. Chamas e Arco-íris usam cores próprias; os demais seguem a paleta. O Equalizador usa níveis sintéticos, sem análise musical.

Em **Tipo de LED**, escolha RGB ou RGBW. O modo RGBW calcula quatro canais por pixel, incluindo um emissor branco dedicado. **Mistura W** distribui a luz entre RGB e branco: 0% mantém somente RGB, 100% usa somente W. Escolha branco quente, neutro ou frio. As tonalidades são aproximações visuais para a tela, não uma calibração de uma fita física. A resolução continua em 200 pixels e 600 LEDs por barra nos dois modos.

Os pixels apagados emitem exatamente zero em todos os canais. O palco não tem iluminação ambiente nem desenho visível da mangueira apagada. Somente os pixels acesos geram difusão e reflexos próximos; os acentos manuais respeitam as regiões apagadas.
