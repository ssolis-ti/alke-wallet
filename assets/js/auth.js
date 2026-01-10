// # logica de autenticacion - maneja el inicio y cierre de sesion - conecta con login.html y config.js
$(document).ready(function () {
    // # evento submit login - captura el envio del formulario - conecta con el form de login.html
    $('#login-form').on('submit', function (e) {
        e.preventDefault();

        console.log("Intento de login...");

        // # obtener valores - lee lo que escribio el usuario - conecta con los inputs del dom
        const email = $('#email').val().trim();
        const password = $('#password').val().trim();

        console.log("Email ingresado:", email);

        // # validacion - busca si el usuario existe en la 'base de datos' - conecta con walletState.users en config.js
        const user = walletState.users.find(u => u.email === email && u.password === password);

        if (user) {
            console.log("Login exitoso:", user.name);
            // # establecer sesion - guarda el usuario activo en el estado global - conecta con walletState en config.js
            walletState.user = user;
            walletState.balance = user.balance; // # carga saldo inicial
            walletState.save();

            // # redireccion - envia al usuario al menu principal - conecta con menu.html
            window.location.href = 'menu.html';
        } else {
            console.log("Fallo de autenticación");
            // # feedback error - avisa al usuario si fallo - conecta con alert del navegador
            alert('Credenciales inválidas. Prueba con user1@example.com / 123');
        }
    });

    // # evento logout - cierra la sesion actual - conecta con el boton salir en menu.html
    $('#logout-btn').on('click', function () {
        walletState.user = null; // # limpia usuario
        walletState.save(); // # guarda estado vacio
        window.location.href = 'login.html'; // # redirecciona al login
    });
});
