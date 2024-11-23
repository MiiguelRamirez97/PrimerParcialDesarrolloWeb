import { AppointmentService } from '../services/AppointmentServices.mjs';
import { BarberService } from '../services/BarberServices.mjs';

class AppointmentController {
    #service;
    #barberService;
    constructor() {
        this.#service = new AppointmentService()
        this.#barberService = new BarberService();
    }

    async createAppointment(req, res) {
        const { identificacion, barbero, fecha, hora } = req.body;

        console.log('estoooo',req.body);

        if (!identificacion || !barbero || !fecha || !hora) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        //const barber = await this.#barberService.getBarberByName(barberName);
        //console.log('estoooo',barber);
        try {
            console.log('entro');
            const appointment = await this.#service.createAppointment(identificacion, barbero, fecha, hora);
            res.status(201).json(appointment);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export { AppointmentController };