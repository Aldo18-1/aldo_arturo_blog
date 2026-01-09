/**
 * Función para cambiar entre las secciones del blog (SPA)
 * @param {string} sectionId - El ID de la sección que queremos mostrar
 */
function navegar(sectionId) {
    // 1. Obtener todas las secciones
    const sections = document.querySelectorAll('.page-section');
    
    // 2. Ocultarlas todas quitando la clase 'active'
    sections.forEach(sec => {
        sec.classList.remove('active');
    });

    // 3. Mostrar la sección deseada añadiendo la clase 'active'
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // 4. Subir el scroll al inicio automáticamente
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Lógica para el botón "Limpiar" del formulario
document.addEventListener('DOMContentLoaded', () => {
    const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            const form = document.getElementById('loginForm');
            form.reset();
            alert('Formulario limpiado');
        });
    }
});

// Puedes añadir aquí la lógica de tu reloj en el futuro
console.log("Blog de Aldo Arturo cargado correctamente.");