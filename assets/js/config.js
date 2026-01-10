// # config - state and mock data
const walletState = {
    // # active user session
    activeUser: null,

    // # simulated database
    users: [
        { id: 1, name: "User 1", email: "user1@example.com", password: "123", balance: 5000 },
        { id: 2, name: "User 2", email: "user2@example.com", password: "123", balance: 3000 },
        { id: 3, name: "User 3", email: "user3@example.com", password: "123", balance: 1000 }
    ],

    // # transactions list
    transactions: [],

    // # load state from local storage or use defaults
    init: function () {
        const stored = localStorage.getItem("alkeWalletState");
        if (stored) {
            const data = JSON.parse(stored);
            this.user = data.user;
            this.balance = data.balance;
            this.transactions = data.transactions;
            // # keep mock users separate or merge if needed? 
            // # for now, users list is static in code as "db"
        }
    },

    // # save current state
    save: function () {
        const data = {
            user: this.user,
            balance: this.balance,
            transactions: this.transactions
        };
        localStorage.setItem("alkeWalletState", JSON.stringify(data));
    }
};

// # auto init on load
walletState.init();

// # helpers can go here
