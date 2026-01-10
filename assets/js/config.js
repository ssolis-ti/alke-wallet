// # configuración y estado global
const walletState = {
    // # usuario logueado
    activeUser: null,

    // # base de datos de usuarios (simulada)
    users: [
        { id: 1, name: "User 1", email: "demo@alkawallet.cl", password: "123", balance: 5000 },
        { id: 2, name: "User 2", email: "demo2@alkawallet.cl", password: "123", balance: 3000 },
        { id: 3, name: "User 3", email: "demo3@alkawallet.cl", password: "123", balance: 1000 }
    ],

    // # lista de movimientos
    transactions: [],

    // # cargamos datos del navegador
    init: function () {
        const stored = localStorage.getItem("alkeWalletState");
        if (stored) {
            const data = JSON.parse(stored);
            this.user = data.user;
            this.balance = data.balance;
            this.transactions = data.transactions;
            // # nota: aquí podríamos mezclar con datos reales
        }
    },

    // # guardamos cambios en el navegador
    save: function () {
        const data = {
            user: this.user,
            balance: this.balance,
            transactions: this.transactions
        };
        localStorage.setItem("alkeWalletState", JSON.stringify(data));
    }
};

// # iniciamos la app
walletState.init();
