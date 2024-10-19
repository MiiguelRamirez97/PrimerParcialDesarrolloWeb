/*const users = JSON.parse(localStorage.getItem('users')) || [];
const citas = JSON.parse(localStorage.getItem('citas')) || [];

// Registro de usuario
document.getElementById('registro-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    users.push({ nombre, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registro exitoso!');
    window.location.href = 'login.html';
});

// Inicio de sesión
document.getElementById('login-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        localStorage.setItem('loggedUser', JSON.stringify(user));
        window.location.href = 'mis-citas.html';
    } else {
        alert('Email o contraseña incorrectos');
    }
});

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
