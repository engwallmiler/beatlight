# BeatLight Pixel Studio

Demonstração visual de mangueiras de LED no escuro, com vinte efeitos e ritmo gerado internamente. Não requer música, microfone, hardware, internet ou instalação.

Abra `beatlight_pixel_studio.html` diretamente no Chrome, Edge ou Firefox. A apresentação inicia automaticamente. Se uma prévia do editor ou do repositório mostrar uma imagem parada ou um aviso sobre JavaScript, baixe/abra o arquivo no navegador.

Para criar curvas, clique em **Desenhar curva**, marque o início e o fim no editor e arraste os quadrados laranja **C1/C2**. Eles controlam a direção e a curvatura de cada ponta. Também é possível editar essas coordenadas pelo formulário, ou trocar **Formato** entre reta e curva e aplicar. Combine trechos com pontas nas mesmas coordenadas para construir geometrias maiores. Os LEDs são distribuídos uniformemente ao longo do comprimento visual da curva; os efeitos, RGBW e flashes continuam disponíveis.

**∞ Aplicar modelo infinito** prepara quatro curvas conectadas e suaves, cada uma com **5 m, 600 LEDs e 200 pixels**: 20 m, 2.400 LEDs e 800 pixels no total. O botão substitui a geometria atual. **Desfazer geometria** recupera até 20 alterações durante a sessão, incluindo a aplicação de modelos, importações e arrastes. Há também um arquivo pronto em [templates/infinito.json](templates/infinito.json), que pode ser aberto em **Importar geometria**.

Curvas são salvas e exportadas no formato JSON versão 2, com `type: "bezier"`, `control1` e `control2`, além dos dados físicos e das pontas. Geometrias só com retas continuam sendo exportadas na versão 1; ambas as versões são aceitas ao importar e ao recuperar o salvamento local.

O modelo inicial tem seis linhas verticais, cada uma com **5 metros, 600 LEDs e 200 pixels controláveis**, com três LEDs compartilhando a cor de cada pixel. O editor permite criar perfis com outras posições, comprimentos e resoluções. O difusor suaviza os pontos de luz; o brilho pode ser reduzido até apagar a emissão.

Em **Geometria dos perfis de LED**, clique em **Desenhar linha** e depois em dois pontos do desenho para marcar o início e o fim. A nova linha começa com 5 m, 600 LEDs e 200 pixels. Selecione uma linha pela lista ou pelo desenho para editar nome, coordenadas, metragem, LEDs e pixels e clique em **Aplicar alterações**. Também é possível arrastar as pontas da linha selecionada, inverter seu sentido e excluir linhas. Esc cancela um desenho ou arraste em andamento. A última linha não pode ser excluída.

O desenho usa X de 0 a 1200, da esquerda para a direita, e Y de 0 a 560, de cima para baixo. As coordenadas definem a posição visual; a metragem física é informada separadamente e não altera automaticamente a escala. Setas indicam o sentido **início → fim**, usado pela distribuição dos pixels. Os efeitos usam a ordem das linhas na lista e percorrem cada uma no seu próprio sentido. A quantidade de LEDs e pixels define a resolução de cada linha; a metragem informa as densidades e os totais físicos. LEDs de um mesmo pixel compartilham a cor; quando a divisão não é exata, os grupos recebem quantidades de LEDs que diferem em no máximo um.

O palco aceita até **32 linhas, 32.768 LEDs e 8.192 pixels no total**. Cada linha aceita de 0,001 a 1.000 m, até 4.096 LEDs e até 2.048 pixels; pixels não podem superar o número de LEDs. Dados inválidos são rejeitados sem substituir a geometria atual. **Modelo de colunas → Recriar geometria em colunas** substitui o desenho por 4, 5, 6 ou 8 colunas com os valores iniciais.

As alterações aplicadas são salvas automaticamente neste navegador, quando o armazenamento local está disponível. **Exportar geometria** baixa um JSON com nome, início, fim, metragem, LEDs e pixels de cada linha; **Importar geometria** recupera esse arquivo e substitui o desenho. Exporte uma cópia para transferir entre navegadores ou evitar perda ao limpar os dados locais. Esses arquivos guardam a geometria, não os controles da apresentação.

Use AUTO SHOW para percorrer as cenas, ou escolha um efeito individual. O BPM determina o ritmo simulado e a duração dos compassos; Velocidade ajusta o movimento dos efeitos. Kick e Clap adicionam acentos manuais; Drop arma uma sequência completa. Espaço pausa/reproduz, K e C adicionam acentos, D arma/cancela/encerra o drop, e N avança a cena quando o foco está fora dos controles.

A apresentação inicia no modo **ORGÂNICO**. Ele sorteia pares de padrões e varia lentamente sua posição, fase, rastro e cor. O padrão principal percorre uma lista embaralhada sem repetição imediata. **Variação** controla o quanto os padrões se deformam e se misturam; **Nova combinação orgânica** cria outro par e entra nesse modo a partir de qualquer cena.

**Transição** ajusta a passagem entre padrões de 1 a 12 segundos, com aceleração e desaceleração suaves. Os dois padrões continuam animados durante a passagem. AUTO SHOW, ORGÂNICO, seleção manual, timeline e Próxima cena usam essa mesma fusão de luz e cor, sem disparar um Drop automaticamente. Se outra cena for escolhida no meio da transição, a nova passagem parte da mistura visível, sem corte.

O intervalo em compassos determina quando começa a próxima troca automática. A duração da transição é limitada a 85% desse intervalo para reservar um momento de estabilidade. Alterar BPM ou duração das cenas não reinicia o relógio. Pausar congela inclusive a transição; selecionar uma cena enquanto pausado mostra sua prévia imediatamente. Reiniciar mantém o modo selecionado e, em ORGÂNICO, cria uma nova combinação.

Efeitos: Atmosfera, Kick Pulse, Chase, Espelhamento, Onda Vertical, Helix, Pixel Rain, Drop Impact, Cometa, Scanner, Estrelas, Meteoros, Chamas, Arco-íris, Blocos, Ping-pong, Ondas Centrais, Equalizador, Serpentina e Aurora. Chamas e Arco-íris usam cores próprias; os demais seguem a paleta. O Equalizador usa níveis sintéticos, sem análise musical.

Em **Tipo de LED**, escolha RGB ou RGBW. O modo RGBW calcula quatro canais por pixel, incluindo um emissor branco dedicado. **Mistura W** distribui a luz entre RGB e branco: 0% mantém somente RGB, 100% usa somente W. Escolha branco quente, neutro ou frio. As tonalidades são aproximações visuais para a tela, não uma calibração de uma fita física. Ambos os modos respeitam a resolução configurada em cada linha.

Os pixels apagados emitem exatamente zero em todos os canais. O palco não tem iluminação ambiente nem desenho visível da mangueira apagada. Somente os pixels acesos geram difusão e reflexos próximos; os acentos manuais respeitam as regiões apagadas.

O **Kick automático** usa o relógio do BPM, com força ajustável, a cada beat ou somente no primeiro tempo. O primeiro beat recebe um acento maior. Escolha compassos 3/4, 4/4 ou 6/4; o marcador visual mostra os tempos. O kick modula apenas os pixels já acesos e pode ser desligado para recuperar o movimento orgânico sem pulsação.

**DROP SHOW / Armar drop** agenda a entrada para o primeiro tempo do próximo compasso. As sequências **Impacto**, **Turbo** e **Prisma** combinam pulsos, perseguições rápidas, cruzamentos e rajadas em frases de quatro compassos. Escolha duração de 4, 8 ou 16 compassos, 1/2/4 passos por beat e Energia. O término retorna suavemente ao padrão e modo anteriores. Clicar de novo cancela a espera ou encerra o drop; escolher outro modo também o cancela. A pausa congela a contagem. O compasso fica bloqueado durante a execução, e as escolhas de sequência, duração e passos se aplicam ao próximo drop armado. Reiniciar encerra o drop e reinicia o modo anterior.

Há **15 paletas**, incluindo vermelho intenso, verde puro, azul elétrico, magenta, ciano, âmbar, RGB primárias e neon. **Comportamento de cor** oferece as cores originais do efeito, espectro contínuo, troca por beat, troca por compasso ou uma cor personalizada fixa. Vermelho intenso em RGB mantém verde e azul zerados; misturar W torna a cor mais clara.

O palco tem exatamente **dois flashes RGBW sincronizados**, um em cada canto superior. Eles compartilham o mesmo pulso, cor e intensidade e disparam sempre juntos. Por padrão, participam só do drop; também podem acompanhar as batidas normais ou apenas o primeiro tempo. Turbo e Prisma usam subdivisões de meio beat. Escolha RGBW, RGB saturado ou branco, e ajuste a intensidade. Em 100%, a energia do pulso tem ganho de quatro vezes, com núcleo muito brilhante, halo amplo, dispersão no palco e reflexo óptico horizontal. Toda essa luz desaparece ao fim do pulso. **Flashes: desligados** apaga ambos imediatamente sem parar as mangueiras. O brilho geral também atua nos flashes. Eles usam o mesmo BPM, compasso e pausa da animação, sem áudio ou hardware.

Para executar os testes locais sem instalar dependências, use `node --test tests/geometry.test.cjs`. Eles verificam o editor, validações, persistência, importação/exportação, agrupamento de LEDs e transições com resoluções distintas. O desenho visual e os gestos nativos ainda devem ser conferidos em um navegador.
