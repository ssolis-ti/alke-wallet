// # lógica de interfaz
const startUI = () => {
    // # si no hay usuario, volvemos al login
    if (!walletState.user) {
        window.location.href = 'login.html';
        return;
    }

    // # actualizamos nombre y saldo en pantalla
    $('#user-name').fadeOut(100).text(walletState.user.name).fadeIn(500);

    // # formato de moneda local (clp) con efecto de resaltado
    const balanceEl = $('#user-balance');
    balanceEl.fadeOut(100, function () {
        $(this).text(`$${walletState.user.balance.toLocaleString('es-CL')}`).fadeIn(500);
        // # efecto visual de pulso para notar el cambio
        $(this).css('transition', 'color 0.3s').addClass('text-warning');
        setTimeout(() => $(this).removeClass('text-warning'), 1000);
    });
};

$(document).ready(function () {
    // # iniciamos si hay elementos de usuario o saldo
    if ($('#user-name').length || $('#user-balance').length) {
        startUI();
    }
});
