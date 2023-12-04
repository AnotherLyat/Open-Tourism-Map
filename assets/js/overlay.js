// Reposiciona o 'zoom' para a direita, para que o overlay não fique na frente.
document.querySelector("body").onload = function(){
   document.querySelector(".leaflet-left").classList.add('leaflet-right')
   document.querySelector(".leaflet-left").classList.remove('leaflet-left')
}

var overlay = document.querySelector(".map-overlay");

var arrowPosition = 0;
var isTransitioning = false;

// Elementos da versão mobile
var overlayButtonMobile = document.querySelector(".overlay-drag-mobile");
var arrowMobile = overlayButtonMobile.children[0];
// Evento 'click' (Mobile)
overlayButtonMobile.addEventListener("click", function (event) {
    if (isTransitioning == false) {
        isTransitioning = true;
        var direction = arrowMobile.classList.contains("fa-arrow-up") ? 'up' : 'down';
        var startPoint = direction == 'up' ? -240 : 0;

        var intervalo = setInterval(() => {
            if (direction == 'up') {
                trocaSeta()
                startPoint += 2;
                overlay.style.marginBottom = startPoint + 'px';
                if (startPoint == 0) {
                    isTransitioning = false;
                    clearInterval(intervalo);
                }
            } else {
                startPoint -= 2;
                overlay.style.marginBottom = startPoint + 'px';
                if (startPoint == -240) {
                    isTransitioning = false;
                    clearInterval(intervalo);
                    trocaSeta();
                }
            }
        }, 1);

        // Troca o sentido da seta
        function trocaSeta() {
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

// Elementos da versão desktop
var overlayButtonDesktop = document.querySelector(".overlay-drag-desktop");
var arrowDesktop = overlayButtonDesktop.children[0];
// Evento 'click' (desktop)
overlayButtonDesktop.addEventListener('click', function(){
    if (isTransitioning == false) {
        isTransitioning = true;
        var direction = arrowDesktop.classList.contains("fa-arrow-right") ? 'right' : 'left';
        var startPoint = direction == 'right' ? -400 : 0;
        console.log(direction);

        var intervalo = setInterval(() => {
                if (direction == 'right'){
                    trocaSeta();
                    startPoint += 2;
                    overlay.style.marginLeft = startPoint + 'px';
                    if (startPoint == 0){
                        clearInterval(intervalo);
                        isTransitioning = false;
                    }
                }else{
                    startPoint -= 2;
                    console.log("here")
                    overlay.style.marginLeft = startPoint + 'px';
                    if (startPoint == -400){
                        clearInterval(intervalo);
                        isTransitioning = false;
                        trocaSeta();
                    }
                }
        }, 1);

        function trocaSeta() {
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