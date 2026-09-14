// Contactos iniciales por defecto si no existen
let defaultContacts = [
    { nombre: "Juan", apellido: "Pérez", cuenta: "12345", correo: "juan@mail.com", banco: "BancoEstado" }
];
if (!localStorage.getItem('wallet_contacts')) {
    localStorage.setItem('wallet_contacts', JSON.stringify(defaultContacts));
}

let contacts = JSON.parse(localStorage.getItem('wallet_contacts'));
let selectedIndex = -1;

function updateUI() {
    const balance = localStorage.getItem('saldo') || '0';
    document.getElementById('balanceDisplay').innerText = `$${Number(balance).toLocaleString('es-CL')}`;
    
    // Renderizar contactos
    const tbody = document.getElementById('contactList');
    tbody.innerHTML = '';
    contacts.forEach((c, index) => {
        tbody.innerHTML += `
            <tr>
                <td><strong>${c.nombre} ${c.apellido}</strong><br><small class="text-muted">${c.correo}</small></td>
                <td>${c.cuenta}<br><span class="badge bg-secondary">${c.banco}</span></td>
                <td>
                    <button onclick="selectContact(${index})" class="btn btn-sm btn-primary mb-1">Elegir</button>
                    <button onclick="deleteContact(${index})" class="btn btn-sm btn-danger mb-1">X</button>
                </td>
            </tr>
        `;
    });
}

function selectContact(index) {
    selectedIndex = index;
    document.getElementById('selectedContact').value = `${contacts[index].nombre} ${contacts[index].apellido}`;
}

function addContact() {
    document.getElementById('ocultar').style.display='none';
    const n = document.getElementById('cNombre').value;
    const a = document.getElementById('cApellido').value;
    const cu = document.getElementById('cCuenta').value;
    const co = document.getElementById('cCorreo').value;
    const b = document.getElementById('cBanco').value;

    if(!n || !a || !cu || !co || !b) return alert("Rellene todos los campos del contacto");

    contacts.push({ nombre: n, apellido: a, cuenta: cu, correo: co, banco: b });
    localStorage.setItem('wallet_contacts', JSON.stringify(contacts));
    updateUI();
    
    // Limpiar campos
    ['cNombre', 'cApellido', 'cCuenta', 'cCorreo', 'cBanco'].forEach(id => document.getElementById(id).value = '');
}

function deleteContact(index) {
    contacts.splice(index, 1);
    localStorage.setItem('wallet_contacts', JSON.stringify(contacts));
    selectedIndex = -1;
    document.getElementById('selectedContact').value = '';
    updateUI();
}

function executeTransfer() {
    if (selectedIndex === -1) return alert("Por favor, seleccione un contacto de la lista.");

    const amountInput = document.getElementById('sendAmount').value;
    const amount = parseFloat(amountInput);
    let currentBalance = parseFloat(localStorage.getItem('saldo') || '0');

    if (isNaN(amount) || amount <= 0) {
        alert("Error: El monto a enviar debe ser mayor a 0.");
        return;
    }
    if (amount > currentBalance) {
        alert("Error: Fondos insuficientes para realizar esta transacción.");
        return;
    }

    // Descontar saldo
    currentBalance -= amount;
    localStorage.setItem('saldo', currentBalance.toString());

    // Registrar transacción
    let txs = JSON.parse(localStorage.getItem('transaction') || '[]');
    txs.push({
        type: 'Envío de Dinero',
        amount: amount,
        date: new Date().toLocaleString(),
        details: `Para: ${contacts[selectedIndex].nombre} (${contacts[selectedIndex].banco})`
    });
    localStorage.setItem('transaction', JSON.stringify(txs));

    alert("¡Éxito! El dinero fue enviado correctamente.");
    document.getElementById('sendAmount').value = '';
    updateUI();
}

updateUI();

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