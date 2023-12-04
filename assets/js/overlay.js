var overlay = document.querySelector(".map-overlay")
var overlayButtonMobile = document.querySelector(".overlay-drag-mobile")
var arrowMobile = overlayButtonMobile.children[0]
var arrowPosition = 0;
var isTransitioning = false;

overlayButtonMobile.addEventListener("click", function (event) {
    if (isTransitioning == false) {
        isTransitioning = true
        var direction = arrowMobile.classList.contains("fa-arrow-up") ? 'up' : 'down';
        var startPoint = direction == 'up' ? -240 : 0;

        var intervalo = setInterval(() => {
            if (direction == 'up') {
                trocaSeta()
                startPoint += 2
                overlay.style.marginBottom = startPoint + 'px';
                if (startPoint == 0) {
                    isTransitioning = false
                    clearInterval(intervalo)
                }
            } else {
                startPoint -= 2
                overlay.style.marginBottom = startPoint + 'px';
                if (startPoint == -240) {
                    isTransitioning = false
                    clearInterval(intervalo)
                    trocaSeta()
                }
            }
        }, 1);

        // Troca o sentido da seta
        function trocaSeta() {
            if (direction == 'up') {
                arrowMobile.classList.remove("fa-arrow-up")
                arrowMobile.classList.add("fa-arrow-down")
            } else {
                arrowMobile.classList.remove("fa-arrow-down")
                arrowMobile.classList.add("fa-arrow-up")
            }
        }
    }
})