import {Db} from "../config/db.mjs";
import jwt from 'jsonwebtoken';
import JWT_SECRET from '../config/jwt.mjs';

class PatientService {
    async login(email, password) {
        const result = await new Db().query('SELECT * FROM patient WHERE email = $1', [email]);
        const patient = result.rows[0];

        if (!patient || password !== patient.password) {
            throw new Error('Invalid email or password');
        }

        const token = jwt.sign({ id: patient.id, role: 'patient' }, JWT_SECRET, { expiresIn: '30m' });
        return token;
    }

}

export { PatientService };