import { Db } from "../config/db.mjs";

class AppointmentService {
    async getAppointmentsByDoctorId(doctorId) {
        try {
            console.log("Getting appointments by doctor id");
            const result = await new Db().query('SELECT * FROM medicalappointment WHERE doctor_id = $1', [doctorId]);
            return result.rows;
        } catch (err) {
            console.log("Error al listar las citas del doctor", err);
            throw err;
        }
    }
}

export { AppointmentService };