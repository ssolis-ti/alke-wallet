// # operaciones de billetera - gestiona depositos y envios - conecta con deposit.html y sendmoney.html
$(document).ready(function () {
    // # logica de deposito - maneja el formulario de ingreso de dinero - conecta con deposit.html
    $('#deposit-form').on('submit', function (e) {
        e.preventDefault();

        // # capturar monto - lee el valor ingresado - conecta con input deposit-amount
        const amount = parseInt($('#deposit-amount').val());

        if (amount > 0) {
            // # actualizar estado - suma el monto al saldo del usuario - conecta con walletState en config.js
            walletState.user.balance += amount;
            walletState.balance = walletState.user.balance;

            // # crear transaccion - genera el registro del movimiento - conecta con el historial
            const transaction = {
                id: Date.now(),
                type: 'deposit', // # tipo operacion
                amount: amount,
                date: new Date().toLocaleDateString(),
                description: 'Depósito de fondos'
            };

            // # guardar transaccion - añade al array de movimientos - conecta con walletState.transactions
            walletState.transactions.push(transaction);

            // # persistir datos - guarda todo en storage - conecta con config.js
            walletState.save();

            alert(`Depósito exitoso. Nuevo saldo: $${walletState.balance}`);
            window.location.href = 'menu.html';
        } else {
            alert('Ingrese un monto válido');
        }
    });

    // # logica de transferencia - maneja el envio de dinero a terceros - conecta con sendmoney.html
    $('#send-form').on('submit', function (e) {
        e.preventDefault();

        const contact = $('#transfer-contact').val();
        const amount = parseInt($('#transfer-amount').val());

        // # validacion saldo - revisa si alcanza el dinero - llama a la funcion auxiliar validateTransfer
        if (validateTransfer(amount)) {
            // # descontar saldo - resta el monto al usuario actual - conecta con walletState
            walletState.user.balance -= amount;
            walletState.balance = walletState.user.balance;

            // # registrar envio - guarda el movimiento como gasto - conecta con historial
            walletState.transactions.push({
                id: Date.now(),
                type: 'payment',
                amount: -amount, // # valor negativo para indicar gasto
                date: new Date().toLocaleDateString(),
                description: `Envío a ${contact}`
            });

            walletState.save();
            alert('Transferencia realizada con éxito');
            window.location.href = 'menu.html';
        }
    });

    // # funcion auxiliar - verifica reglas de negocio para transferir - conecta con logica interna
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
