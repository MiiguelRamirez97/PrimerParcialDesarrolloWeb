import { DoctorService } from "../services/DoctorService.mjs";

class DoctorController {
    constructor() {
        this.doctorService = new DoctorService();
    }

    async getDoctorById(req, res) {
        const { doctorId } = req.params;

        try {
            const doctor = await this.doctorService.getDoctorById(doctorId);
            if (!doctor) {
                return res.status(404).json({ message: 'Doctor not found' });
            }
            res.status(200).json(doctor);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export { DoctorController };