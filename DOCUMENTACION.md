# Documentación Técnica: Alke Wallet

Este documento detalla la arquitectura, estructura y flujo de trabajo del proyecto Alke Wallet.

## 1. Arquitectura del Proyecto
El proyecto sigue una arquitectura Modular, Se separa claramente la Estructura (HTML), el Estilo (CSS) y la Lógica (Javascript).

### Conceptos Clave:
* Todo el estado de la aplicación (usuario, saldo, movimientos) vive en un único objeto (`walletState` en `config.js`) y se guarda en el navegador (`localStorage`).

*   **Separación**
    *   `auth.js`: Solo maneja login/logout.
    *   `wallet.js`: Solo maneja dinero (depósitos/envíos).
    *   `ui.js`: Solo maneja lo que se ve en pantalla.
    *   `transactions.js`: Solo maneja el historial.

## 2. Estructura de Carpetas


alke-wallet/
│
├── index.html          # Puerta de entrada (redirección)
├── login.html          # Pantalla de inicio de sesión
├── menu.html           # Dashboard principal (resumen)
├── deposit.html        # Pantalla de depósito
├── sendmoney.html      # Pantalla de envío
├── transactions.html   # Pantalla de historial
├── contacts.html       # Pantalla de contactos
│
├── assets/
│   ├── css/            # Hoja de estilos
│   │   ├── main.css    # Estilos generales
│   │   
│   │
│   ├── js/             # Lógica de programación (Módulos)
│       ├── config.js   # "Cerebro" de la app (Estado y Datos)
│       ├── auth.js     # Lógica de seguridad
│       ├── wallet.js   # Lógica de dinero
│       ├── transactions.js # Lógica de historial
│       ├── contacts.js # Lógica de contactos
│       └── ui.js       # Lógica visual
│   
│   
│       
│
└── DOCUMENTACION.md    # Este archivo


## 3. Descripción de Archivos

### HTML (Vistas)
1.  **`index.html`**: No tiene contenido visible. Su única función es redirigir automáticamente al usuario al login si entra a la raíz.
2.  **`login.html`**: Formulario de entrada. Pide correo y contraseña.
3.  **`menu.html`**: La pantalla principal. Muestra el saldo actual, saludo al usuario y botones para navegar a las otras operaciones.
4.  **`deposit.html`**: Formulario simple para sumar dinero a la cuenta.
5.  **`sendmoney.html`**: Formulario para restar dinero (simulando un envío).
6.  **`transactions.html`**: Lista dinámica que muestra el historial de movimientos.
7.  **`contacts.html`**: Pantalla para gestionar la lista de contactos.

### Javascript (Lógica)
1.  **`config.js`**: 
    *   **Qué es:** El archivo de configuración y base de datos simulada.
    *   **Función:** Inicializa la app, carga datos guardados y define el objeto `walletState`.
2.  **`auth.js`**: 
    *   **Qué es:** El controlador de seguridad.
    *   **Función:** Escucha el formulario de login, valida si el usuario existe en `walletState.users`, y guarda la sesión.
3.  **`ui.js`**: 
    *   **Qué es:** El controlador de interfaz.
    *   **Función:** Lee los datos del usuario logueado y "pinta" su nombre y saldo en el HTML.
4.  **`wallet.js`**: 
    *   **Qué es:** El motor de transacciones.
    *   **Función:** Suma o resta saldo al usuario y agrega registros al historial de transacciones.
5.  **`transactions.js`**: 
    *   **Qué es:** El lector de historial.
    *   **Función:** Recorre la lista de transacciones guardada y genera filas en la tabla/lista HTML.
6.  **`contacts.js`**:
    *   **Qué es:** El gestor de agenda.
    *   **Función:** Permite agregar y listar contactos guardados.

## 4. Git y Flujo de Trabajo (Ramas)


### Ramas Creadas:
1.  **`main`**: La rama principal. Contiene el código final, probado y funcional.
2.  **`feature/login`**: Aquí se creó `auth.js` y `login.html`.
3.  **`feature/menu`**: Aquí se creó el dashboard y `ui.js`.
4.  **`feature/depositos`**: Aquí se creó la lógica de sumar dinero.
5.  **`feature/envios`**: Aquí se creó la lógica de restar dinero.
6.  **`feature/transacciones`**: Aquí se creó el historial.
7.  **`feature/contactos`**: Aquí se creó la lógica de agenda y `contacts.html`.
8.  **`feature/estilos`**: Implementación de diseño robótico y mejoras de UI.
