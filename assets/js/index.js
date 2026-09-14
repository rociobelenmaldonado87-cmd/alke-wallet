// Inicializar datos base en localStorage si no existen
if (!localStorage.getItem('saldo')) {
    localStorage.setItem('saldo', '0');
    localStorage.setItem('transaction', JSON.stringify([]));
}

// Credenciales autorizadas de prueba
const usuarioCorrecto = { email: "roberto@correo.cl", password: "JavaFullStack" };
const usuarioCorrecto1 = { email: "rocio@correo.cl", password: "JavaFullStack" };
const usuarioCorrecto2 = { email: "christian@correo.cl", password: "JavaFullStack" };

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const correoIngresado = document.getElementById('correo').value;
    const contraseñaIngresada = document.getElementById('contraseña').value;

    if (correoIngresado === usuarioCorrecto.email && contraseñaIngresada === usuarioCorrecto.password) {
        alert("¡Inicio de sesión exitoso! Redireccionando...");
        sessionStorage.setItem("userEmail", correoIngresado);
        window.location.href = "../web/menu.html";
    } else if (correoIngresado === usuarioCorrecto1.email && contraseñaIngresada === usuarioCorrecto1.password) {
        alert("¡Inicio de sesión exitoso! Redireccionando...");
        sessionStorage.setItem("userEmail", correoIngresado);
        window.location.href = "../web/menu.html";
    } else if (correoIngresado === usuarioCorrecto2.email && contraseñaIngresada === usuarioCorrecto2.password) {
        alert("¡Inicio de sesión exitoso! Redireccionando...");
        sessionStorage.setItem("userEmail", correoIngresado);
        window.location.href = "../web/menu.html";
    } else {
        alert("Correo o contraseña inválidos. Intente nuevamente.");
    }
});