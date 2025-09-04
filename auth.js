// Elementos del DOM
const form = document.getElementById('loginForm');
const nombreInput = document.getElementById('nombre');
const apellidosInput = document.getElementById('apellidos');
const nombreError = document.getElementById('nombreError');
const apellidosError = document.getElementById('apellidosError');
const statusMessage = document.getElementById('statusMessage');
const clearBtn = document.getElementById('clearBtn');
const saveToFileBtn = document.getElementById('saveToFileBtn');

// Verificar si hay datos guardados previamente
document.addEventListener('DOMContentLoaded', () => {
    const savedUser = localStorage.getItem('usuario');
    if (savedUser) {
        showStatus('Ya has iniciado sesión. Serás redirigido...', 'info');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }
});

// Validación en tiempo real
nombreInput.addEventListener('input', validateNombre);
apellidosInput.addEventListener('input', validateApellidos);

function validateNombre() {
    const value = nombreInput.value.trim();
    if (value.length === 0) {
        showError(nombreError, 'El nombre es obligatorio');
        return false;
    } else if (value.length < 2) {
        showError(nombreError, 'El nombre debe tener al menos 2 caracteres');
        return false;
    } else {
        hideError(nombreError);
        return true;
    }
}

function validateApellidos() {
    const value = apellidosInput.value.trim();
    if (value.length === 0) {
        showError(apellidosError, 'Los apellidos son obligatorios');
        return false;
    } else if (value.length < 2) {
        showError(apellidosError, 'Los apellidos deben tener al menos 2 caracteres');
        return false;
    } else {
        hideError(apellidosError);
        return true;
    }
}

function showError(element, message) {
    element.textContent = message;
    element.style.color = '#dc3545';
}

function hideError(element) {
    element.textContent = '';
}

function showStatus(message, type = 'success') {
    statusMessage.textContent = message;
    statusMessage.style.color = type === 'success' ? '#28a745' : type === 'info' ? '#17a2b8' : '#ffc107';
}

// Función para descargar datos como archivo
function downloadData(filename, data) {
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

// Manejo del formulario
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const isNombreValid = validateNombre();
    const isApellidosValid = validateApellidos();
    
    if (isNombreValid && isApellidosValid) {
        const nombre = nombreInput.value.trim();
        const apellidos = apellidosInput.value.trim();
        
        // Guardar en localStorage
        localStorage.setItem('usuario', `${nombre} ${apellidos}`);
        
        showStatus('Iniciando sesión...');
        
        // Simular carga antes de redirigir
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
});

// Limpiar formulario
clearBtn.addEventListener('click', () => {
    nombreInput.value = '';
    apellidosInput.value = '';
    hideError(nombreError);
    hideError(apellidosError);
    statusMessage.textContent = '';
});

// Guardar datos en archivo
saveToFileBtn.addEventListener('click', () => {
    const isNombreValid = validateNombre();
    const isApellidosValid = validateApellidos();
    
    if (isNombreValid && isApellidosValid) {
        const nombre = nombreInput.value.trim();
        const apellidos = apellidosInput.value.trim();
        
        // Crear contenido para el archivo
        const contenido = `Nombre: ${nombre}\nApellidos: ${apellidos}\nFecha: ${new Date().toLocaleString()}`;
        
        // Descargar archivo
        downloadData('datos.txt', contenido);
        
        showStatus('Datos guardados en archivo correctamente', 'success');
    } else {
        showStatus('Por favor, complete correctamente el formulario', 'error');
    }
});
