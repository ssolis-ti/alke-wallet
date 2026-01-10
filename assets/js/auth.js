// # lógica de login y logout
$(document).ready(function () {
    // # al enviar el formulario
    $('#login-form').on('submit', function (e) {
        e.preventDefault();

        console.log("Intento de login...");

        // # obtenemos email y pass
        const email = $('#email').val().trim();
        const password = $('#password').val().trim();

        console.log("Email ingresado:", email);

        // # buscamos al usuario
        const user = walletState.users.find(u => u.email === email && u.password === password);

        if (user) {
            console.log("Login exitoso:", user.name);
            // # guardamos la sesión
            walletState.user = user;
            walletState.balance = user.balance; // # cargamos saldo
            walletState.save();

            // # vamos al menú
            window.location.href = 'menu.html';
        } else {
            console.log("Fallo de autenticación");
            // # avisamos si falló
            alert('Credenciales inválidas. Prueba con demo@alkawallet.cl / 123');
        }
    });

    // # al salir
    $('#logout-btn').on('click', function () {
        walletState.user = null; // # borramos usuario
        walletState.save(); // # guardamos cambios
        window.location.href = 'login.html'; // # volvemos al login
    });
});
