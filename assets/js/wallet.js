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

    // # transfer logic (placeholder or shared file)
});
