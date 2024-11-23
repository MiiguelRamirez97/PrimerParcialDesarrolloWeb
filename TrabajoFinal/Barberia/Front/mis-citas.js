document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
        alert('No estás logueado');
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:8081/appointments/byClient', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const appointments = await response.json();
            const tableBody = document.querySelector('#appointments-table tbody');
            tableBody.innerHTML = '';

            appointments.forEach(appointment => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${appointment.appointment_date}</td>
                    <td>${appointment.appointment_hour}</td>
                    <td>${appointment.barber_name}</td>
                    <td>${appointment.status}</td>
                `;
                tableBody.appendChild(row);
            });
        } else {
            alert('Error al obtener las citas');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al obtener las citas');
    }
});