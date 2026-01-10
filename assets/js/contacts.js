// # lógica de contactos
$(document).ready(function () {
    // # validamos sesión
    if (!walletState.user) {
        window.location.href = 'login.html';
        return;
    }

    // # función para mostrar contactos
    const renderContacts = () => {
        const list = $('#contacts-list');
        list.empty();
        const contacts = walletState.contacts;

        if (contacts.length === 0) {
            list.append('<div class="list-group-item">No tienes contactos guardados.</div>');
        } else {
            contacts.forEach(c => {
                list.append(`
                    <div class="list-group-item">
                        <h5 class="mb-0">${c.name}</h5>
                        <small class="text-muted">${c.email}</small>
                    </div>
                `);
            });
        }
    };

    // # inicializamos lista
    renderContacts();
    $('#collapseContacts').on('show.bs.collapse', renderContacts);

    // # agregar contacto
    $('#add-contact-form').on('submit', function (e) {
        e.preventDefault();
        const name = $('#contact-name').val();
        const email = $('#contact-email').val();

        if (!name || !email) {
            alert('Por favor complete todos los campos');
            return;
        }

        walletState.contacts.push({ name, email });
        walletState.save();
        
        $('#add-contact-form')[0].reset();
        renderContacts();
        alert('Contacto guardado');
    });
});