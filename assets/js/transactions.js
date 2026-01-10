// # transaction history
$(document).ready(function () {
    // # check auth
    if (!walletState.user) {
        window.location.href = 'login.html';
        return;
    }

    const list = $('#transactions-list');
    list.empty(); // clear placeholder

    // # get txs
    const txs = walletState.transactions;

    if (txs.length === 0) {
        list.append('<div class="list-group-item">No hay movimientos registrados.</div>');
    } else {
        // # render each tx
        // sort by date desc (if not already) - assuming ID is timestamp sufficient for now
        txs.sort((a, b) => b.id - a.id).forEach(tx => {
            const colorClass = tx.type === 'deposit' ? 'text-success' : 'text-danger';
            const symbol = tx.type === 'deposit' ? '+' : '';

            const html = `
                <div class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <h5 class="mb-1">${tx.description}</h5>
                        <small class="text-muted">${tx.date}</small>
                    </div>
                    <span class="${colorClass} fw-bold">
                        ${symbol}$${Math.abs(tx.amount).toLocaleString('es-CL')}
                    </span>
                </div>
            `;
            list.append(html);
        });
    }
});
