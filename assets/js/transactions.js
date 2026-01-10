// # historial de transacciones - visualizacion de movimientos - conecta con transactions.html y config.js
$(document).ready(function () {
    // # verificar sesion - bloquea acceso si no hay usuario - conecta con config.js
    if (!walletState.user) {
        window.location.href = 'login.html';
        return;
    }

    const list = $('#transactions-list');
    list.empty(); // # limpia estado anterior

    // # obtener movimientos - lee el array de transacciones guardado - conecta con walletState.transactions
    const txs = walletState.transactions;

    if (txs.length === 0) {
        list.append('<div class="list-group-item">No hay movimientos registrados.</div>');
    } else {
        // # renderizar lista - recorre y crea elementos html para cada movimiento - conecta con el dom
        // # ordenamiento - muestra primero lo mas reciente - logica de array sort
        txs.sort((a, b) => b.id - a.id).forEach(tx => {
            // # estilos condicionales - verde para ingreso, rojo para egreso - conecta con bootstrap classes
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
