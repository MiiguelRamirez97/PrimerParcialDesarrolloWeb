import { AppointmentService } from "../services/AppointmentService.mjs";

class AppointmentController {
    constructor() {
        this.appointmentService = new AppointmentService();
        this.getAppointmentsByDoctorId = this.getAppointmentsByDoctorId.bind(this);
        this.getAppointmentsByPatientId = this.getAppointmentsByPatientId.bind(this);
        this.createAppointment = this.createAppointment.bind(this);
    }

    async getAppointmentsByDoctorId(req, res) {
        const { doctorId } = req.params;
        try {
            const appointments = await this.appointmentService.getAppointmentsByDoctorId(doctorId);
            if (!appointments || appointments.length === 0) {
                return res.status(200).json({ message: 'No appointments found for this doctor' });
            }
            res.status(200).json(appointments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAppointmentsByPatientId(req, res) {
        const { patientId } = req.params;
        let { date } = req.query;

        if (date) {
            const [day, month, year] = date.split('-');
            date = `${year}-${month}-${day}`;
        }

        try {
            const appointments = await this.appointmentService.getAppointmentsByPatientId(patientId, date);
            if (!appointments || appointments.length === 0) {
                return res.status(200).json({ message: 'No appointments found for this patient' });
            }
            res.status(200).json(appointments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async createAppointment(req, res) {
        const { patientId } = req.params;
        const { doctorId, date, hour } = req.body;

        console.log(patientId, doctorId, date, hour);

        if (!patientId || !doctorId || !date || !hour) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        try {
            const appointment = await this.appointmentService.createAppointment(patientId, doctorId, date, hour);
            res.status(201).json(appointment);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export { AppointmentController };