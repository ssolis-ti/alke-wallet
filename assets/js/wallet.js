// # wallet operations
$(document).ready(function () {
    // # deposit logic
    $('#deposit-form').on('submit', function (e) {
        e.preventDefault();

        // # get amount
        const amount = parseInt($('#deposit-amount').val());

        if (amount > 0) {
            // # update state
            walletState.user.balance += amount;
            walletState.balance = walletState.user.balance;

            // # record transaction
            const transaction = {
                id: Date.now(),
                type: 'deposit',
                amount: amount,
                date: new Date().toLocaleDateString(),
                description: 'Depósito de fondos'
            };

            walletState.transactions.push(transaction); // push to temp array if consistent
            // NOTE: config.js defines interactions? 
            // Better to push to walletState.transactions and save.

            walletState.save();

            alert(`Depósito exitoso. Nuevo saldo: $${walletState.balance}`);
            window.location.href = 'menu.html';
        } else {
            alert('Ingrese un monto válido');
        }
    });

    // # transfer logic
    $('#send-form').on('submit', function (e) {
        e.preventDefault();

        const contact = $('#transfer-contact').val();
        const amount = parseInt($('#transfer-amount').val());

        if (validateTransfer(amount)) {
            // # deduct from current user
            walletState.user.balance -= amount;
            walletState.balance = walletState.user.balance;

            // # find recipient (simulated)
            // # in real app, we would update the recipient's balance too
            // # here we just record the deduction

            // # record transaction
            walletState.transactions.push({
                id: Date.now(),
                type: 'payment',
                amount: -amount,
                date: new Date().toLocaleDateString(),
                description: `Envío a ${contact}`
            });

            // # save contacts? (optional feature not in core requirement but good for "contactos")
            // walletState.contacts.push(contact); 

            walletState.save();
            alert('Transferencia realizada con éxito');
            window.location.href = 'menu.html';
        }
    });

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
