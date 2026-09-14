function updateUI() {
    const balance = localStorage.getItem('saldo') || '0';
    document.getElementById('balanceDisplay').innerText = `$${Number(balance).toLocaleString('es-CL')}`;
}
updateUI();

function executeDeposit() {
    const amountInput = document.getElementById('amount').value;
    const amount = parseFloat(amountInput);

    if (isNaN(amount) || amount <= 0) {
        alert("Debe ingresar un monto válido superior a 0.");
        return;
    }

    // Actualizar Saldo
    let currentBalance = parseFloat(localStorage.getItem('saldo') || '0');
    currentBalance += amount;
    localStorage.setItem('saldo', currentBalance.toString());

    // Registrar Transacción
    let txs = JSON.parse(localStorage.getItem('transaction') || '[]');
    txs.push({
        type: 'Depósito',
        amount: amount,
        date: new Date().toLocaleString(),
        details: 'Abono a cuenta propia'
    });
    localStorage.setItem('transaction', JSON.stringify(txs));

    alert(`Has depositado $${amount} a tu cuenta.`);
    document.getElementById('amount').value = '';
    document.getElementById('amount').focus();
    updateUI();
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