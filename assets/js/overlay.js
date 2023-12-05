
// Indice
//  #1 - inicializando overlay
//  #2 - Mobile
//  #3 - Desktop





/* * * * * * * *
 *  #1
 *  Inicializando o overlay
 *      - Inicializa variaveis para animação e reposiciona elementos
 *        necessários
 *
 */
// Reposiciona o 'zoom' para a direita, para que o overlay não fique na frente.
document.querySelector("body").onload = function () {
    document.querySelector(".leaflet-left").classList.add('leaflet-right')
    document.querySelector(".leaflet-left").classList.remove('leaflet-left')
}

// Elemento da janela overlay
var overlay = document.querySelector(".map-overlay");

// Variaveis para controlar a animação.
var arrowPosition = 0;
var isTransitioning = false;





/* * * * * * * *
 *  #2
 *  Algoritmos da versão mobile
 *
 *
 */

// Elementos da versão mobile
var overlayButtonMobile = document.querySelector(".overlay-drag-mobile");
var arrowMobile = overlayButtonMobile.children[0];
// Evento 'click' (Mobile)
overlayButtonMobile.addEventListener("click", function (event) {
    // Só executa se isTransitioning = false
    if (isTransitioning == false) {
        // Assim que executa, não permite outra execução simultânea
        isTransitioning = true;
        // Inicializa posição baseado na classe
        var direction = arrowMobile.classList.contains("fa-arrow-up") ? 'up' : 'down';
        var startPoint = direction == 'up' ? -240 : 0;

        // Invervalo: resumidamente um loop com delay entre as execuções
        var intervalo = setInterval(() => {
            // Anima ↑
            if (direction == 'up') {
                // troca sentido da seta
                trocaSeta()
                // incrementa posição da janela a cada execução...
                startPoint += 2;
                // e aplica o novo estilo
                overlay.style.marginBottom = startPoint + 'px';
                // Nesse caso, quando o valor for 0...
                if (startPoint == 0) {
                    // Para o intervalo e permite outra execução
                    isTransitioning = false;
                    clearInterval(intervalo);
                }
            }
            // Anima ↓
            else if (direction == 'down') {
                // Decrementa posicao da janela a cada execução
                startPoint -= 2;
                // aplica novo estilo
                overlay.style.marginBottom = startPoint + 'px';
                // Nesse caso, quando o valor for -240
                if (startPoint == -240) {
                    // Para o intervalo e permite outra execução
                    isTransitioning = false;
                    clearInterval(intervalo);
                    // Nesse caso, só troca o sentido da seta no final do loop
                    trocaSeta();
                }
            }
        }, 1);

        // Troca o sentido da seta (↑, ↓)
        function trocaSeta() {
            // Resumidamente, usa o sentido atual para selecionar o sentido oposto.
            if (direction == 'up') {
                arrowMobile.classList.remove("fa-arrow-up");
                arrowMobile.classList.add("fa-arrow-down");
            } else {
                arrowMobile.classList.remove("fa-arrow-down");
                arrowMobile.classList.add("fa-arrow-up");
            }
        }
    }
})





/* * * * * * * *
 *  #3
 *  Algoritmos da versão desktop
 *
 *
 */

// Elementos da versão desktop
var overlayButtonDesktop = document.querySelector(".overlay-drag-desktop");
var arrowDesktop = overlayButtonDesktop.children[0];
// Evento 'click' (desktop)
overlayButtonDesktop.addEventListener('click', function () {
    // Só executa se isTransitioning = false
    if (isTransitioning == false) {
        // Assim que executa, não permite outra execução simultânea
        isTransitioning = true;
        // Inicializa posição baseado na classe
        var direction = arrowDesktop.classList.contains("fa-arrow-right") ? 'right' : 'left';
        var startPoint = direction == 'right' ? -400 : 0;

        // Invervalo: resumidamente um loop com delay entre as execuções
        var intervalo = setInterval(() => {
            // Anima →
            if (direction == 'right') {
                // troca sentido da seta
                trocaSeta();
                // incrementa posição da janela a cada execução...
                startPoint += 4;
                // aplica novo estilo
                overlay.style.marginLeft = startPoint + 'px';
                // Nesse caso, quando o valor for 0...
                if (startPoint == 0) {
                    // para o intervalo e permite outra execução
                    clearInterval(intervalo);
                    isTransitioning = false;
                }
            }
            // Anima ←
            else if (direction == 'left') {
                // Decrementa posição da janela a cada execução
                startPoint -= 4;
                // aplica novo estilo
                overlay.style.marginLeft = startPoint + 'px';
                // nesse caso, quando o valor for -400...
                if (startPoint == -400) {
                    // para o intervalo e permite outra execução
                    clearInterval(intervalo);
                    isTransitioning = false;
                    // nesse caso, só troca o sentido da seta no final do intervalo
                    trocaSeta();
                }
            }
        }, 1);
        // Troca o sentido da seta (→, ←)
        function trocaSeta() {
            // Resumidamente, usa o sentido atual para selecionar o sentido oposto.
            if (direction == 'left') {
                arrowDesktop.classList.remove("fa-arrow-left");
                arrowDesktop.classList.add("fa-arrow-right");
            } else {
                arrowDesktop.classList.remove("fa-arrow-right");
                arrowDesktop.classList.add("fa-arrow-left");
            }
        }
    }
})

//  Essa função verifica constantemente alterações na largura da tela para posicionar corretamente
// os elementos dependendo da versão (desktop/mobile)
window.addEventListener("resize", () => {
    if (window.innerWidth <= 650) {
        if (arrowDesktop.classList.contains("fa-arrow-left")) {
            overlay.style.marginLeft = '0px'
        } else if (overlay.style.marginLeft == '-400px') {
            overlay.style.marginLeft = '0px'
        }
    } else {
        if (arrowDesktop.classList.contains("fa-arrow-right")) {
            overlay.style.marginLeft = '-400px'
        }
    }
})