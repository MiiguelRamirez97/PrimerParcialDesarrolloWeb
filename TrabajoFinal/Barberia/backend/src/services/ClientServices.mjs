import {Db} from "../config/db.mjs";
import { Client } from "../models/Client.mjs";
import jwt from 'jsonwebtoken';
import JWT_SECRET from '../config/jwt.mjs';

class ClientService{
    getAllClients = async () => {
        try {
            console.log("Getting all clients");
            const query = "SELECT * FROM client";
            const results = await new Db().query(query);
            return results.rows.map(({client_document,client_name,client_mobile}) => new Client(client_document, client_name, client_mobile));
        } catch (err) {
            console.log("error al listar los clientes", err);
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
            console.log(results.rows[0]);
            const {client_document, client_name, client_mobile, client_email} = results.rows[0];
            const client = new Client(client_document, client_name, client_mobile, client_email);
            const token = jwt.sign({ id: client.id, role: 'client' }, JWT_SECRET, { expiresIn: '30m' });
            return { token };
        } catch (err) {
            console.log("error al logear el cliente", err);
            throw err;
        }
    }
}

export  { ClientService };