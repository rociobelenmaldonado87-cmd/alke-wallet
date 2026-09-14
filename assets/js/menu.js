// Cargar saldo
const balance = localStorage.getItem('saldo') || '0';
document.getElementById('balanceDisplay').innerText = `$${Number(balance).toLocaleString('es-CL')}`;

// Función de navegación con alerta obligatoria
function navigate(page) {
    alert(`Usted está siendo redireccionado a ${page}.`);
    window.location.href = page;
}

/*Lógica de JavaScript para mostrar en el navbar el 
nombre del usuario que se conectó al iniciar sesión*/
// 1. Leer el correo almacenado en sessionStorage
const loggedUser = sessionStorage.getItem("userEmail");

// 2. Control de seguridad: Si no hay usuario guardado, redirigir al login
if (!loggedUser) {
    alert("Acceso denegado. Por favor, inicia sesión primero.");
    window.location.href = "index.html"; 
} else {
    // 3. Mostrar el mensaje personalizado en el encabezado
    document.getElementById("welcomeMessage").textContent = `¡Bienvenido, ${loggedUser}!`;
}

// 4. Lógica para el botón de cerrar sesión
document.getElementById("logoutBtn").addEventListener("click", function() {
    sessionStorage.removeItem("userEmail"); // Borra el correo guardado
    window.location.href = "../web/index.html";   // Redirige al login
});