// src/js/main.js
// ==========================================================
// FASE ACTUAL: HTML/CSS sin dependencia de JavaScript.
// ÚNICAMENTE se conserva la autenticación simulada del login.
// Todo el comportamiento dinámico anterior (inyección de
// componentes, pestañas, overlay) quedó retirado de esta fase
// y se retomará cuando se implemente la fase de JS.
// ==========================================================

document.addEventListener('DOMContentLoaded', function () {

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
                if (modalDesactivada) {
                    modalDesactivada.classList.remove('oculto');
                }
                return;
            }

            // FA01.1.1 - Contraseña incorrecta
            if (passwordIngresado !== usuarioPrueba.password) {
                errorPassword.textContent = 'Contraseña incorrecta, intente nuevamente';
                errorPassword.classList.remove('oculto');
                return;
            }

            // Todo correcto -> redirige al dashboard
            window.location.href = 'Admin/dashboard.html';
        });
    }

    // -------------------------------------------------------------
    // LISTADO DE INSTRUCTORES — Mostrar más tarjetas al hacer scroll
    // Fase temporal sin backend: revela las tarjetas ocultas.
    // -------------------------------------------------------------
    const tarjetasExtra = document.querySelectorAll('.tarjeta-instructor-extra');
    const pieListado = document.querySelector('.pie-listado .texto-conteo-listado');

    if (tarjetasExtra.length > 0) {
        const revelarExtras = function () {
            tarjetasExtra.forEach(function (tarjeta) {
                tarjeta.style.display = 'flex';
            });
            if (pieListado) {
                pieListado.textContent = 'Mostrando 12 instructores de 24';
            }
        };

        const comprobarScroll = function () {
            const puntoRevelacion = window.innerHeight + window.scrollY;
            const ultimaTarjeta = tarjetasExtra[tarjetasExtra.length - 1];
            const ultimaPosicion = ultimaTarjeta.getBoundingClientRect().top + window.scrollY;

            if (puntoRevelacion >= ultimaPosicion) {
                revelarExtras();
                window.removeEventListener('scroll', comprobarScroll);
            }
        };

        window.addEventListener('scroll', comprobarScroll);
        comprobarScroll();
    }

    // -------------------------------------------------------------
    // Bloques retirado en esta sesion, se retomaran en fase de JS:
    //   - Inyección de componentes compartidos (navbar y footer)
    //   - Marcado del enlace activo y filtro por rol en el navbar
    //   - Menú desplegable del usuario
    //   - Pestañas de detalle de ficha
    //   - Overlay "Actualizar ficha"
    // --------------------------------------------------------------

});