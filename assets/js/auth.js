// # auth logic
$(document).ready(function () {
    // # login form submission
    $('#login-form').on('submit', function (e) {
        e.preventDefault();

        // # get values
        const email = $('input[type="email"]').val();
        const password = $('input[type="password"]').val();

        // # validate credentials against config "db"
        const user = walletState.users.find(u => u.email === email && u.password === password);

        if (user) {
            // # set active user
            walletState.user = user;
            walletState.balance = user.balance; // # load initial balance
            walletState.save();

            // # redirect
            window.location.href = 'menu.html';
        } else {
            // # show error
            alert('Credenciales inválidas');
        }
    });

    // # logout logic (if present on page)
    $('#logout-btn').on('click', function () {
        walletState.user = null;
        walletState.save();
        window.location.href = 'login.html';
    });
});
