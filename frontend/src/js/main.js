// src/js/main.js

document.addEventListener('DOMContentLoaded', function () {

    // ==========================================================
    // COMPONENTES COMPARTIDOS — Navbar y pie de página
    // Inyectados desde frontend/componentes/
    // Requiere servir el sitio con un servidor local
    // ==========================================================

    const contenedorNavbar = document.querySelector('#barra-navegacion');

    if (contenedorNavbar) {
        const paginaActiva = contenedorNavbar.dataset.paginaActiva;

        fetch('../../componentes/navbar.html')
            .then(function (respuesta) { return respuesta.text(); })
            .then(function (html) {
                contenedorNavbar.outerHTML = html;

                document.querySelectorAll('.enlace-nav[data-pagina]').forEach(function (enlace) {
                    if (enlace.dataset.pagina === paginaActiva) {
                        enlace.classList.add('enlace-nav-activo');
                    }
                });

                // ==================================================
                // Datos del usuario de la página (luego vendrán de
                // la sesión/backend). Quedan los valores del
                // componente si la página no los define.
                // ==================================================
                const nombreUsuario = document.querySelector('.nombre-usuario');
                const rolUsuarioPagina = contenedorNavbar.dataset.usuarioRol;

                if (nombreUsuario && contenedorNavbar.dataset.usuarioNombre) {
                    nombreUsuario.textContent = contenedorNavbar.dataset.usuarioNombre;
                }

                const rolUsuarioTexto = document.querySelector('.rol-usuario');
                if (rolUsuarioTexto && contenedorNavbar.dataset.usuarioRol) {
                    rolUsuarioTexto.textContent = contenedorNavbar.dataset.usuarioRol;
                }

                // ==================================================
                // Filtro por rol: oculta enlaces y opciones del menú
                // marcados con data-roles que no incluyan el rol de
                // la página actual
                // ==================================================
                if (rolUsuarioPagina) {
                    document.querySelectorAll('[data-roles]').forEach(function (elemento) {
                        const rolesPermitidos = elemento.dataset.roles.split(',').map(function (rol) {
                            return rol.trim().toLowerCase();
                        });

                        if (!rolesPermitidos.includes(rolUsuarioPagina.toLowerCase())) {
                            elemento.classList.add('oculto');
                        }
                    });
                }

                // ==================================================
                // Menú desplegable del usuario
                // (Por ahora solo queda oculto vía CSS. La lógica de
                // mostrar/ocultar se implementa en la fase de JS.)
                // ==================================================
            })
            .catch(function () {
                console.error('No se pudo cargar el navbar. Abre el sitio con un servidor local.');
            });
    }

    const contenedorPiePagina = document.querySelector('#pie-dashboard');

    if (contenedorPiePagina) {
        fetch('../../componentes/footer.html')
            .then(function (respuesta) { return respuesta.text(); })
            .then(function (html) {
                contenedorPiePagina.outerHTML = html;
            })
            .catch(function () {
                console.error('No se pudo cargar el pie de página. Abre el sitio con un servidor local.');
            });
    }

    // ==========================================================
    // LOGIN — Simulación temporal de "base de datos"
    // Se reemplaza cuando haya backend real conectado
    // ==========================================================
    const usuarioPrueba = {
        usuario: "admin@puntualix.com",
        password: "12345678",
        activo: true // cambia a false para probar el flujo de cuenta desactivada
    };

    const formularioLogin = document.querySelector('#formulario-login');

    if (formularioLogin) {
        formularioLogin.addEventListener('submit', function (evento) {
            evento.preventDefault();

            const usuarioIngresado = document.querySelector('#nombre-usuario').value.trim();
            const passwordIngresado = document.querySelector('#password').value;

            const errorUsuario = document.querySelector('#nombre-usuario')
                .closest('.formulario-agrupado')
                .querySelector('.mensaje-error');

            const errorPassword = document.querySelector('#password')
                .closest('.formulario-agrupado')
                .querySelector('.mensaje-error');

            const modalDesactivada = document.querySelector('#modal-cuenta-desactivada');

            // Ocultar errores previos antes de validar de nuevo
            errorUsuario.classList.add('oculto');
            errorPassword.classList.add('oculto');

            // FA01.1.3 - Campos vacíos
            if (usuarioIngresado === '' || passwordIngresado === '') {
                if (usuarioIngresado === '') {
                    errorUsuario.textContent = 'Debe completar todos los campos para iniciar sesión';
                    errorUsuario.classList.remove('oculto');
                }
                if (passwordIngresado === '') {
                    errorPassword.textContent = 'Debe completar todos los campos para iniciar sesión';
                    errorPassword.classList.remove('oculto');
                }
                return;
            }

            // FA01.1.2 - Usuario no existe
            if (usuarioIngresado !== usuarioPrueba.usuario) {
                errorUsuario.textContent = 'El usuario ingresado no existe en el sistema';
                errorUsuario.classList.remove('oculto');
                return;
            }

            // FA01.1.4 - Cuenta desactivada
            if (!usuarioPrueba.activo) {
                modalDesactivada.classList.remove('oculto');
                return;
            }

            // FA01.1.1 - Contraseña incorrecta
            if (passwordIngresado !== usuarioPrueba.password) {
                errorPassword.textContent = 'Contraseña incorrecta, intente nuevamente';
                errorPassword.classList.remove('oculto');
                return;
            }

            // Todo correcto -> redirige al dashboard
            window.location.href = 'admin/dashboard.html';
        });
    }

}); // fin DOMContentLoaded