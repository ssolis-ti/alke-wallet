// # lógica del historial
$(document).ready(function () {
    // # validamos sesión
    if (!walletState.user) {
        window.location.href = 'login.html';
        return;
    }

    // # función de renderizado
    const renderTransactions = () => {
        const list = $('#transactions-list');
        list.empty(); // # limpiamos la lista

        // # sacamos las transacciones del estado
        const txs = walletState.transactions;

        if (txs.length === 0) {
            list.append('<div class="list-group-item">No hay movimientos registrados.</div>');
        } else {
            // # recorremos y mostramos cada movimiento
            // # ordenamos: lo más nuevo primero
            txs.sort((a, b) => b.timestamp - a.timestamp).forEach(tx => {
                // # verde si entra, rojo si sale
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
    };

    // # renderizar al inicio y al abrir la sección
    renderTransactions();
    $('#collapseHistory').on('show.bs.collapse', renderTransactions);
});
