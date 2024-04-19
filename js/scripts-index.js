let valueDisplays = document.querySelectorAll(".num");
let duration = 3500; // Duración total del contador en milisegundos
let countersStarted = new Set(); // Conjunto para rastrear los contadores que ya han comenzado

// Función para verificar si la sección de estadísticas es visible en la ventana gráfica
function isElementInViewport(el) {
    let rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Función para iniciar el contador si la sección es visible, el contador no ha comenzado y el valor final no ha sido alcanzado
function startCounterIfVisible(valueDisplay) {
    if (!countersStarted.has(valueDisplay) && isElementInViewport(valueDisplay)) {
        countersStarted.add(valueDisplay); // Agrega el contador al conjunto para evitar reinicializaciones
        let startValue = 0;
        let endValue = parseInt(valueDisplay.getAttribute("data-val"));
        let startTime = null;

        function updateCounter(timestamp) {
            if (!startTime) startTime = timestamp;
            let progress = timestamp - startTime;
            let increment = Math.floor((progress / duration) * endValue);
            startValue = Math.min(increment, endValue);
            valueDisplay.textContent = startValue;

            if (progress < duration && startValue < endValue) {
                requestAnimationFrame(updateCounter);
            }
        }

        requestAnimationFrame(updateCounter);
    }
}

// Evento de desplazamiento para verificar la visibilidad al desplazarse
window.addEventListener('scroll', function () {
    valueDisplays.forEach(valueDisplay => startCounterIfVisible(valueDisplay));
});

// También verifica la visibilidad cuando la página se carga
document.addEventListener('DOMContentLoaded', function () {
    valueDisplays.forEach(valueDisplay => startCounterIfVisible(valueDisplay));
});