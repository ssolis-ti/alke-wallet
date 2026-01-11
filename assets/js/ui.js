// # lógica de interfaz
const startUI = () => {
    // # si no hay usuario, volvemos al login
    if (!walletState.user) {
        window.location.href = 'login.html';
        return;
    }

    // # actualizamos nombre y saldo en pantalla
    $('#user-name').text(walletState.user.name);
    // # formato de moneda local (clp)
    $('#user-balance').text(`$${walletState.user.balance.toLocaleString('es-CL')}`);
};

$(document).ready(function () {
    // # iniciamos si hay elementos de usuario o saldo
    if ($('#user-name').length || $('#user-balance').length) {
        startUI();
    }
});
