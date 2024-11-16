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

    async getAppointmentsByPatientId(patientId, date = null) {
        try {
            let query = 'SELECT * FROM medicalappointment WHERE patient_id = $1';
            const values = [patientId];

            if (date) {
                query += ' AND date = $2';
                values.push(date);
            }

            const result = await new Db().query(query, values);
            return result.rows;
        } catch (err) {
            console.log("Error al listar las citas del paciente", err);
            throw err;
        }
    }

    async createAppointment(patientId, doctorId, date, hour) {
        try {
            const doctorConflict = await new Db().query(
                'SELECT * FROM medicalappointment WHERE doctor_id = $1 AND date = $2 AND hour = $3',
                [doctorId, date, hour]
            );
            if (doctorConflict.rows.length > 0) {
                throw new Error('There is already an appointment for this doctor at the specified date and time');
            }

            const patientConflict = await new Db().query(
                'SELECT * FROM medicalappointment WHERE patient_id = $1 AND date = $2 AND hour = $3',
                [patientId, date, hour]
            );
            if (patientConflict.rows.length > 0) {
                throw new Error('There is already an appointment for this patient at the specified date and time');
            }

            const result = await new Db().query(
                'INSERT INTO medicalappointment (date, hour, patient_id, doctor_id) VALUES ($1, $2, $3, $4) RETURNING *',
                [date, hour, patientId, doctorId]
            );
            return result.rows[0];
        } catch (err) {
            console.log("Error al crear la cita", err);
            throw err;
        }
    }

    async updateAppointment(appointmentId, doctorId, date, hour) {
        try {
            const doctorConflict = await new Db().query(
                'SELECT * FROM medicalappointment WHERE doctor_id = $1 AND date = $2 AND hour = $3 AND id != $4',
                [doctorId, date, hour, appointmentId]
            );
            if (doctorConflict.rows.length > 0) {
                throw new Error('There is already an appointment for this doctor at the specified date and time');
            }

            const result = await new Db().query(
                'UPDATE medicalappointment SET doctor_id = $1, date = $2, hour = $3 WHERE id = $4 RETURNING *',
                [doctorId, date, hour, appointmentId]
            );
            return result.rows[0];
        } catch (err) {
            console.log("Error al actualizar la cita", err);
            throw err;
        }
    }

    async deleteAppointment(appointmentId) {
        const db = new Db();
        try {
            const result = await db.query('DELETE FROM medicalappointment WHERE id = $1 RETURNING *', [appointmentId]);
            return "Appointment deleted";
        } catch (err) {
            console.log("Error al eliminar la cita", err);
            throw err;
        }
    }
}

export { AppointmentService };