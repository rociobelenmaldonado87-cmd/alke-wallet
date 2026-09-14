const txs = JSON.parse(localStorage.getItem('transaction') || '[]');
const tbody = document.getElementById('transactionList');

if (txs.length === 0) {
    document.getElementById('noTransactions').classList.remove('d-none');
} else {
    // Mostrar de la más reciente a la más antigua
    txs.reverse().forEach(t => {
        const isDeposit = t.type === 'Depósito';
        const badgeColor = isDeposit ? 'bg-success' : 'bg-danger';
        const amountSign = isDeposit ? '+' : '-';

        tbody.innerHTML += `
            <tr>
                <td><small>${t.date}</small></td>
                <td><span class="badge ${badgeColor}">${t.type}</span></td>
                <td>${t.details}</td>
                <td class="${isDeposit ? 'text-success' : 'text-danger'} fw-bold">
                    ${amountSign}$${t.amount.toLocaleString('es-CL')}
                </td>
            </tr>
        `;
    });
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