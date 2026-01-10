// # actualizaciones de interfaz - renderiza datos del usuario en pantalla - conecta con menu.html y config.js
const startUI = () => {
    // # verificar sesion - asegura que haya un usuario logueado - conecta con walletState en config.js
    if (!walletState.user) {
        window.location.href = 'login.html';
        return;
    }

    // # actualizar dom - muestra nombre y saldo actualizados - conecta con elementos html por id
    $('#user-name').text(walletState.user.name);
    // # formateo de moneda - muestra el saldo con formato local - conecta con el span user-balance
    $('#user-balance').text(`$${walletState.user.balance.toLocaleString('es-CL')}`);
};

$(document).ready(function () {
    // # inicializacion condicional - solo corre si existen elementos de usuario - conecta con la carga de la pagina
    if ($('#user-name').length) {
        startUI();
    }
});
