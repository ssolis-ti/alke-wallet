// # ui updates
const startUI = () => {
    // # check auth
    if (!walletState.user) {
        window.location.href = 'login.html';
        return;
    }

    // # update dom
    $('#user-name').text(walletState.user.name);
    $('#user-balance').text(`$${walletState.user.balance.toLocaleString('es-CL')}`);
};

$(document).ready(function () {
    // # only run if on a page with these elements
    if ($('#user-name').length) {
        startUI();
    }
});
