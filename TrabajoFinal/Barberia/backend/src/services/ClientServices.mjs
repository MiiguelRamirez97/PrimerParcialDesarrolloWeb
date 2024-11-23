import {Db} from "../config/db.mjs";
import { Client } from "../models/Client.mjs";
import jwt from 'jsonwebtoken';
import JWT_SECRET from '../config/jwt.mjs';

class ClientService{
    getClientByDocument = async (clientDocument) => {
        try {
            console.log("Getting client");
            const query = "SELECT * FROM client WHERE client_document = $1";
            const results = await new Db().query(query, [clientDocument]);
            return results.rows[0];
        } catch (err) {
            console.log("error al obtener el cliente", err);
            throw err;
        }
    }

    loginClient = async (email, password) => {
        try {
            console.log("Logging in client");
            const query = "SELECT * FROM client WHERE client_email = $1 AND client_password = $2";
            const values = [email, password];
            const results = await new Db().query(query, values);
            if (results.rowCount === 0) {
                throw new Error("Invalid email or password");
            }
            const {client_document, client_name, client_mobile, client_email} = results.rows[0];
            const client = new Client(client_document, client_name, client_mobile, client_email);
            const token = jwt.sign({ id: client.id, role: 'client' }, JWT_SECRET, { expiresIn: '30m' });
            return { token };
        } catch (err) {
            console.log("error al logear el cliente", err);
            throw err;
        }
    }

    async registerClient(email, password, name, mobile, identification) {
        try {
            const result = await new Db().query(
                'INSERT INTO client (client_email, client_password, client_name, client_mobile, client_document) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [email, password, name, mobile, identification]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error('Error registering client');
        }
    }
}

export  { ClientService };