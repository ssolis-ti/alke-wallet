// # auth logic
$(document).ready(function () {
    // # login form submission
    $('#login-form').on('submit', function (e) {
        e.preventDefault();

        console.log("Intento de login...");

        // # get values
        const email = $('#email').val().trim();
        const password = $('#password').val().trim();

        console.log("Email ingresado:", email);

        // # validate credentials against config "db"
        const user = walletState.users.find(u => u.email === email && u.password === password);

        if (user) {
            console.log("Login exitoso:", user.name);
            // # set active user
            walletState.user = user;
            walletState.balance = user.balance; // # load initial balance
            walletState.save();

            // # redirect
            window.location.href = 'menu.html';
        } else {
            console.log("Fallo de autenticación");
            // # show error
            alert('Credenciales inválidas. Prueba con user1@example.com / 123');
        }
    });

    // # logout logic (if present on page)
    $('#logout-btn').on('click', function () {
        walletState.user = null;
        walletState.save();
        window.location.href = 'login.html';
    });
});
