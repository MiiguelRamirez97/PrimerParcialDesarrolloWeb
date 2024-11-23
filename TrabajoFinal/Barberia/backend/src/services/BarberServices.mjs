import {Db} from "../config/db.mjs";
import { Barber } from "../models/Barber.mjs";
import jwt from 'jsonwebtoken';
import JWT_SECRET from '../config/jwt.mjs';

class BarberService{
    getAllBarbers = async () => {
        try {
            console.log("Getting all barbers");
            const query = "SELECT * FROM barber";
            const results = await new Db().query(query);
            return results.rows.map(({barber_document,barber_name,barber_mobile}) => new Barber(barber_document, barber_name, barber_mobile));
        } catch (err) {
            console.log("error al listar los barberos", err);
            throw err;
        }
    }

    loginBarber = async (email, password) => {
        try {
            console.log("Logging in barber");
            const query = "SELECT * FROM barber WHERE barber_email = $1 AND barber_password = $2";
            const values = [email, password];
            const results = await new Db().query(query, values);
            if (results.rowCount === 0) {
                throw new Error("Invalid email or password");
            }
            console.log(results.rows[0]);
            const {barber_document, barber_name, barber_mobile, barber_email} = results.rows[0];
            const barber = new Barber(barber_document, barber_name, barber_mobile, barber_email);
            const token = jwt.sign({ id: barber.id, role: 'barber' }, JWT_SECRET, { expiresIn: '30m' });
            return { token };
        } catch (err) {
            console.log("error al logear el barbero", err);
            throw err;
        }
    }
}

export { BarberService };