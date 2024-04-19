document.addEventListener('DOMContentLoaded', function () {
    // Selecciona todos los elementos de navegación, elementos de menú desplegable, proyectos y el botón "ver más"
    const navItems = document.querySelectorAll('.nav-item');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const proyectos = document.querySelectorAll('.proyecto');
    const seeMoreBtn = document.querySelector('.ver-mas-btn');

    // Inicializa el número de proyectos visibles y la clase seleccionada
    let proyectosVisibles = 6;
    let claseSeleccionada = 'proyecto';

    // Función para mostrar los proyectos según la cantidad especificada
    function mostrarProyectos() {
        let proyectosVisiblesContador = 0;

        proyectos.forEach((proyecto) => {
            const tieneClase = proyecto.classList.contains(claseSeleccionada);

            if (tieneClase) {
                if (proyectosVisiblesContador < proyectosVisibles) {
                    proyecto.style.display = 'block';
                    proyectosVisiblesContador++;
                } else {
                    proyecto.style.display = 'none';
                }
            } else {
                proyecto.style.display = 'none';
            }
        });
    }

    // Función para cargar más proyectos
    function cargarMasProyectos() {
        proyectosVisibles += 3;
        mostrarProyectos(); // Llama a mostrarProyectos después de cargar más proyectos
    
        // Reinicia AOS para que se apliquen los cambios en los nuevos elementos
        AOS.refresh();
    }
    
    // Función para filtrar los proyectos según la clase relacionada
    function filtrarProyectos(claseRelacionada) {
        claseSeleccionada = claseRelacionada;

        if (claseSeleccionada === 'todos') {
            claseSeleccionada = 'proyecto';
        }

        proyectos.forEach(proyecto => {
            proyecto.style.display = 'none';
        });

        document.querySelectorAll(`.proyecto.${claseRelacionada}`).forEach(proyecto => {
            proyecto.style.display = 'block';
        });

        proyectosVisibles = 6;
        mostrarProyectos();
    }

    // Agrega event listeners a los elementos de navegación
    navItems.forEach(item => {
        item.addEventListener('click', function (event) {
            if (item.classList.contains('dropdown')) {
                event.preventDefault();
                return;
            }

            const claseRelacionada = item.querySelector('a').innerText.toLowerCase().replace(' ', '');
            filtrarProyectos(claseRelacionada);
        });
    });

    // Agrega event listeners a los elementos de menú desplegable
    dropdownItems.forEach(item => {
        item.addEventListener('click', function () {
            const claseRelacionada = item.innerText.toLowerCase().replace(' ', '');
            filtrarProyectos(claseRelacionada);
        });
    });

    // Agrega un event listener al botón "ver más" para cargar más proyectos
    seeMoreBtn.addEventListener('click', cargarMasProyectos);

    // Muestra los proyectos iniciales
    mostrarProyectos();
});
