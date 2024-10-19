export default class App{
    /*constructor(){
        document.addEventListener('DOMContentLoaded', this.#getAppointments);
    }

    async #getAppointments(){
        const dateInput = document.getElementById('date');
        const timeInput = document.getElementById('time');
        const form = document.getElementById('appointment-form');

        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.min = tomorrow.toISOString().split('T')[0];

        form.addEventListener('submit', (event) => {
            const selectedDate = new Date(dateInput.value);
            const selectedTime = timeInput.value;

            const [hours, minutes] = selectedTime.split(':').map(Number);
            if (hours < 8 || hours >= 20) {
                alert('Por favor, selecciona una hora entre las 8:00 AM y las 8:00 PM.');
                event.preventDefault();
            }
        });
    }*/

}