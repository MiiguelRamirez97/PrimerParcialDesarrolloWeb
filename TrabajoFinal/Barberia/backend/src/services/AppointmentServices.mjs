import { Db } from "../config/db.mjs";

class AppointmentService{
    createAppointment = async(clientDocument, barberDocument, date, hour) => {
        try {
            const barberConflict = await new Db().query(
                'SELECT * FROM appointment WHERE barber_document = $1 AND appointment_date = $2 AND appointment_hour = $3',
                [barberDocument, date, hour]
            );
            if (barberConflict.rows.length > 0) {
                throw new Error('There is already an appointment for this barber at the specified date and time');
            }

            const clientConflict = await new Db().query(
                'SELECT * FROM appointment WHERE client_document = $1 AND appointment_date = $2 AND appointment_hour = $3',
                [clientDocument, date, hour]
            );
            if (clientConflict.rows.length > 0) {
                throw new Error('There is already an appointment for this client at the specified date and time');
            }
            
            const result = await new Db().query(
                'INSERT INTO appointment (appointment_date, client_document, barber_document, appointment_hour, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [date, clientDocument, barberDocument, hour, "aproved"]
            );
            return result.rows[0];
        } catch (err) {
            console.log("Error al crear la cita", err);
            throw err;
        }
    }
}

export { AppointmentService };