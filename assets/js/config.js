// # configuración y estado global
const walletState = {
    // # usuario logueado
    activeUser: null,

    // # base de datos de usuarios (simulada)
    users: [
        { id: 1, name: "User 1", email: "demo@alkewallet.cl", password: "123", balance: 5000 }
    ],

    // # lista de movimientos
    transactions: [],

    // # lista de contactos
    contacts: [],

    // # cargamos datos del navegador
    init: function () {
        const stored = localStorage.getItem("alkeWalletState_v4");
        if (stored) {
            const data = JSON.parse(stored);
            this.user = data.user;
            this.balance = data.balance;
            this.transactions = data.transactions || [];
            this.contacts = data.contacts || [];
            if (data.users) {
                this.users = data.users;
            }
        }
    },

    // # guardamos cambios en el navegador
    save: function () {
        // # actualizamos usuario en la lista
        if (this.user) {
            const idx = this.users.findIndex(u => u.email === this.user.email);
            if (idx !== -1) this.users[idx] = this.user;
        }

        const data = {
            user: this.user,
            balance: this.balance,
            transactions: this.transactions,
            contacts: this.contacts,
            users: this.users
        };
        localStorage.setItem("alkeWalletState_v4", JSON.stringify(data));
    }
};

// # iniciamos la app
walletState.init();
