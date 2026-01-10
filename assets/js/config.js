// # configuracion del estado - gestiona los datos de la app - conecta con localstorage y toda la app
const walletState = {
    // # usuario activo - almacena la sesion actual del usuario logueado - conecta con auth.js y ui.js
    activeUser: null,

    // # base de datos simulada - contiene la lista de usuarios registrados - conecta con auth.js para validar credenciales
    users: [
        { id: 1, name: "User 1", email: "user1@example.com", password: "123", balance: 5000 },
        { id: 2, name: "User 2", email: "user2@example.com", password: "123", balance: 3000 },
        { id: 3, name: "User 3", email: "user3@example.com", password: "123", balance: 1000 }
    ],

    // # historial de transacciones - almacena los movimientos realizados - conecta con wallet.js y transactions.js
    transactions: [],

    // # inicializacion - carga el estado guardado desde el navegador - conecta con localStorage al inicio
    init: function () {
        const stored = localStorage.getItem("alkeWalletState");
        if (stored) {
            const data = JSON.parse(stored);
            this.user = data.user;
            this.balance = data.balance;
            this.transactions = data.transactions;
            // # nota - se podrian fusionar usuarios aqui si fuera una app real
        }
    },

    // # guardar estado - persiste los cambios en el navegador - conecta con localStorage en cada operacion
    save: function () {
        const data = {
            user: this.user,
            balance: this.balance,
            transactions: this.transactions
        };
        localStorage.setItem("alkeWalletState", JSON.stringify(data));
    }
};

// # auto arranque - ejecuta la carga inicial de datos - conecta con el inicio de cualquier script
walletState.init();
