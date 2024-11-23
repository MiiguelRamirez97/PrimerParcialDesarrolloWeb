/*const users = JSON.parse(localStorage.getItem('users')) || [];
const citas = JSON.parse(localStorage.getItem('citas')) || [];
*/
// Registro de cliente
/*document.getElementById('registro-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    users.push({ nombre, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registro exitoso!');
    window.location.href = 'login.html';
});*/

// Inicio de sesión
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registroForm = document.getElementById('registro-form');
    const opcionesOcultas = document.getElementById('opciones-ocultas');
    const iniciarSesion = document.getElementById('iniciar-sesion');
    const cerrarSesion = document.getElementById('cerrar-sesion');
    const misCitas = document.querySelector('a[href="mis-citas.html"]');
    const agendarCita = document.querySelector('a[href="agendar.html"]');


    const token = localStorage.getItem('jwt_token');
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const role = payload.role;
        if (opcionesOcultas) {
            opcionesOcultas.style.display = 'inline';
        }
        if (iniciarSesion) {
            iniciarSesion.style.display = 'none';
        }
        if (role === 'barber') {
            if (agendarCita) {
                agendarCita.style.display = 'none';
            }
        } else if (role === 'client') {
            if (agendarCita) {
                agendarCita.style.display = 'inline';
            }
        }
    }

    if (cerrarSesion) {
        cerrarSesion.addEventListener('click', (event) => {
            event.preventDefault();
            localStorage.removeItem('jwt_token');
            window.location.href = 'index.html';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://localhost:8081/users/login ', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                if (response.ok) {
                    const data = await response.json();
                    alert('Inicio de sesion exitoso.');
                    localStorage.setItem('jwt_token', data.token);
                    window.location.href = 'index.html';
                } else {
                    document.getElementById('login-error').style.display = 'block';
                }
            } catch (error) {
                console.error('Error:', error);
                document.getElementById('login-error').style.display = 'block';
            }
        });
    }

    if (registroForm) {
        registroForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const mobile = document.getElementById('mobile').value;
            const identificacion = document.getElementById('identification').value;

            try {
                const response = await fetch('http://localhost:8081/clients/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name: nombre, email, password, mobile, identification:identificacion })
                });

                if (response.ok) {
                    const data = await response.json();
                    alert('Registro exitoso. Ahora puedes iniciar sesión.');
                    window.location.href = 'login.html';
                } else {
                    alert('Error al registrar. Por favor, verifica los datos ingresados.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al registrar. Por favor, intenta nuevamente.');
            }
        });
    }
});
/*
// Mostrar citas en "Mis Citas"
const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
if (loggedUser) {
    document.getElementById('opciones-ocultas').style.display = 'block';
    const citasList = document.getElementById('citas-list');
    const userCitas = citas.filter(cita => cita.email === loggedUser.email);
    userCitas.forEach(cita => {
        const li = document.createElement('li');
        li.textContent = `${cita.fecha} a las ${cita.hora} - ${cita.servicio}`;
        citasList.appendChild(li);
    });
} else {
    document.getElementById('opciones-ocultas').style.display = 'none';
    alert('Debes iniciar sesión para ver tus citas.');
    window.location.href = 'login.html';
}

// Gestión de citas en administración
if (document.getElementById('citas-admin-list')) {
    const adminCitasList = document.getElementById('citas-admin-list');
    citas.forEach(cita => {
        const li = document.createElement('li');
        li.textContent = `${cita.fecha} a las ${cita.hora} - ${cita.servicio}`;
        adminCitasList.appendChild(li);
    });
}

// Agregar cita
document.getElementById('agendar-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!loggedUser) {
        alert('Debes iniciar sesión para agendar una cita.');
        return;
    }

    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const servicio = document.getElementById('servicio').value;

    citas.push({ email: loggedUser.email, fecha, hora, servicio });
    localStorage.setItem('citas', JSON.stringify(citas));
    alert('Cita agendada exitosamente!');
    window.location.href = 'mis-citas.html';
});*/
import App from './resources/modules/app.js';

const app = ()=> new App();
app();
