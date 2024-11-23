import {Db} from "../config/db.mjs";
import { Client } from "../models/Client.mjs";
import { Barber } from "../models/Barber.mjs";
import jwt from 'jsonwebtoken';
import JWT_SECRET from '../config/jwt.mjs';

class UserService{
    login = async (email, password) => {
        try {
            console.log("Logging user");

            let query = "SELECT * FROM barber WHERE barber_email = $1 AND barber_password = $2";
            let values = [email, password];
            let results = await new Db().query(query, values);

            if (results.rowCount > 0) {
                console.log(results.rows[0]);
                const { barber_document, barber_name, barber_mobile, barber_email } = results.rows[0];
                const barber = new Barber(barber_document, barber_name, barber_mobile, barber_email);
                const token = jwt.sign({ id: barber.id, role: 'barber' }, JWT_SECRET, { expiresIn: '30m' });
                return { token };
            }

            query = "SELECT * FROM client WHERE client_email = $1 AND client_password = $2";
            values = [email, password];
            results = await new Db().query(query, values);

            if (results.rowCount > 0) {
                console.log(results.rows[0]);
                const { client_document, client_name, client_mobile, client_email } = results.rows[0];
                const client = new Client(client_document, client_name, client_mobile, client_email);
                const token = jwt.sign({ id: client.id, role: 'client' }, JWT_SECRET, { expiresIn: '30m' });
                return { token };
            }

            throw new Error("Invalid email or password");

        } catch (err) {
            console.log("Error al logear el usuario", err);
            throw err;
        }
    }
}

export { UserService };