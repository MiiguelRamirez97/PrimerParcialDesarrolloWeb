import { AppointmentService } from "../services/AppointmentService.mjs";

class AppointmentController {
    constructor() {
        this.appointmentService = new AppointmentService();
        this.getAppointmentsByDoctorId = this.getAppointmentsByDoctorId.bind(this);
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
}

export { AppointmentController };