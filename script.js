// Ejecutar cuando cargue la página
document.addEventListener('DOMContentLoaded', () => {
    verificarSesion();
});

// Función para comprobar si hay un nombre guardado
function verificarSesion() {
    const nombreGuardado = localStorage.getItem('blog_usuario_nombre');
    const banner = document.getElementById('welcome-banner');
    const loginPage = document.getElementById('login-page');
    const nav = document.getElementById('main-nav');

    if (nombreGuardado) {
        // SI EXISTE USUARIO:
        banner.innerHTML = `Hola <span>${nombreGuardado}</span>, gracias por entrar aquí`;
        banner.style.display = 'inline-block';
        nav.style.display = 'flex';
        
        // Ocultar login y mostrar blog
        loginPage.classList.remove('active');
        navegar('principal-page');
    } else {
        // NO EXISTE USUARIO:
        banner.style.display = 'none';
        nav.style.display = 'none';
        navegar('login-page');
    }
}

// Función para guardar el nombre e iniciar sesión
function iniciarSesion() {
    const input = document.getElementById('userNameInput');
    const nombre = input.value.trim();

    if (nombre.length < 2) {
        alert("Por favor, ingresa un nombre válido.");
        return;
    }

    // GUARDAR EN EL NAVEGADOR (LocalStorage)
    localStorage.setItem('blog_usuario_nombre', nombre);
    
    // Refrescar la vista
    verificarSesion();
}

// Función para borrar los datos (Cerrar Sesión)
function cerrarSesion() {
    if (confirm("¿Seguro que quieres salir?")) {
        localStorage.removeItem('blog_usuario_nombre');
        location.reload(); // Recarga la página para volver al login
    }
}

// Función para navegar entre secciones
function navegar(sectionId) {
    // Solo permitir navegar si hay sesión iniciada o si vamos al login
    if (!localStorage.getItem('blog_usuario_nombre') && sectionId !== 'login-page') {
        return;
    }

    const sections = document.querySelectorAll('.page-section');
    sections.forEach(s => s.classList.remove('active'));

    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add('active');
        window.scrollTo(0, 0);
    }
}