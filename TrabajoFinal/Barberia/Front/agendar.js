document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
        alert('No estás logueado');
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:8081/clients/byDocument', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const data = await response.json();
            document.getElementById('email').value = data.client_email;
            document.getElementById('identificacion').value = data.client_document;
        } else {
            alert('Error al obtener los datos del cliente');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al obtener los datos del cliente');
    }

    try {
        const barbersResponse = await fetch('http://localhost:8081/barbers/get', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (barbersResponse.ok) {
            const barbersData = await barbersResponse.json();
            const barberoSelect = document.getElementById('barbero');
            barberoSelect.innerHTML = '';

            barbersData.forEach(barbero => {
                const option = document.createElement('option');
                option.value = barbero.id;
                option.textContent = `${barbero.name}`;
                barberoSelect.appendChild(option);
            });
        } else {
            alert('Error al obtener la lista de barberos');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al obtener la lista de barberos');
    }

    // Agregar cita
    document.getElementById('agendar-form')?.addEventListener('submit', async function(e) {
        e.preventDefault();

        const fecha = document.getElementById('date').value;
        const hora = document.getElementById('time').value;
        const barbero = document.getElementById('barbero').value;

        try {
            const response = await fetch('http://localhost:8081/appointments/create', {
                method: 'POST',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: document.getElementById('email').value,
                    identificacion: document.getElementById('identificacion').value,
                    fecha,
                    hora,
                    barbero
                })
            });

            if (response.ok) {
                alert('Cita agendada exitosamente!');
                window.location.href = 'mis-citas.html';
            } else {
                alert('Error al agendar la cita');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al agendar la cita');
        }
    });
});