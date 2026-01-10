// # lógica de depósitos y envíos
$(document).ready(function () {
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
                type: 'deposit', // # tipo de operación
                amount: amount,
                date: new Date().toLocaleDateString(),
                description: 'Depósito de fondos'
            };

            // # guardamos en historial
            walletState.transactions.push(transaction);

            // # guardamos todo
            walletState.save();

            alert(`Depósito exitoso. Nuevo saldo: $${walletState.balance}`);
            window.location.href = 'menu.html';
        } else {
            alert('Ingrese un monto válido');
        }
    });

    // # formulario de transferencia
    $('#send-form').on('submit', function (e) {
        e.preventDefault();

        const contact = $('#transfer-contact').val();
        const amount = parseInt($('#transfer-amount').val());

        // # validamos saldo
        if (validateTransfer(amount)) {
            // # restamos del saldo
            walletState.user.balance -= amount;
            walletState.balance = walletState.user.balance;

            // # registramos el gasto
            walletState.transactions.push({
                id: Date.now(),
                type: 'payment',
                amount: -amount, // # negativo porque es gasto
                date: new Date().toLocaleDateString(),
                description: `Envío a ${contact}`
            });

            walletState.save();
            alert('Transferencia realizada con éxito');
            window.location.href = 'menu.html';
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
