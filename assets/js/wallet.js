// # lógica de depósitos y envíos
$(document).ready(function () {
    // # función para cargar contactos
    const loadTransferContacts = () => {
        const contactSelect = $('#transfer-contact');
        contactSelect.find('option:not(:first)').remove();
        walletState.contacts.forEach(c => {
            contactSelect.append(`<option value="${c.email}">${c.name}</option>`);
        });
    };

    // # cargar al inicio y al abrir la sección
    loadTransferContacts();
    $('#collapseSend').on('show.bs.collapse', loadTransferContacts);

    // # formulario de depósito
    $('#deposit-form').on('submit', function (e) {
        e.preventDefault();

        // # obtenemos el monto
        const amount = parseInt($('#deposit-amount').val());

        if (amount > 0) {
            // # sumamos al saldo
            walletState.user.balance += amount;
            walletState.balance = walletState.user.balance;

            // # creamos la transacción
            const transaction = {
                id: Date.now(),
                timestamp: Date.now(), // # timestamp para ordenar
                type: 'deposit', // # tipo de operación
                amount: amount,
                date: new Date().toLocaleString('es-CL'), // # fecha y hora
                description: 'Depósito de fondos'
            };

            // # guardamos en historial
            walletState.transactions.push(transaction);

            // # guardamos todo
            walletState.save();

            // # actualizamos ui y limpiamos
            startUI();
            $('#deposit-form')[0].reset();
            alert(`Depósito exitoso. Nuevo saldo: $${walletState.balance}`);
        } else {
            alert('Ingrese un monto válido');
        }
    });

    // # formulario de transferencia
    $('#send-form').on('submit', function (e) {
        e.preventDefault();

        const contact = $('#transfer-contact').val();
        const amount = parseInt($('#transfer-amount').val());

        if (!contact) {
            alert("Por favor seleccione un contacto");
            return;
        }

        // # validamos saldo
        if (validateTransfer(amount)) {
            // # restamos del saldo
            walletState.user.balance -= amount;
            walletState.balance = walletState.user.balance;

            // # registramos el gasto
            walletState.transactions.push({
                id: Date.now(),
                timestamp: Date.now(), // # timestamp para ordenar
                type: 'payment',
                amount: -amount, // # negativo porque es gasto
                date: new Date().toLocaleString('es-CL'), // # fecha y hora
                description: `Envío a ${contact}`
            });

            walletState.save();
            startUI();
            $('#send-form')[0].reset();
            alert('Transferencia realizada con éxito');
        }
    });

    // # validaciones extra
    const validateTransfer = (amount) => {
        if (amount <= 0) {
            alert("El monto debe ser positivo");
            return false;
        }
        if (amount > walletState.balance) {
            alert("Saldo insuficiente");
            return false;
        }
        return true;
    };
});
