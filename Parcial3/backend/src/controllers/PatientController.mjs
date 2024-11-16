import {PatientService} from '../services/PatientServices.mjs';
import { validationResult } from 'express-validator';

class PatientController {
    #service;
    constructor() {
        this.#service = new PatientService();
    }


    async login(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const token = await this.#service.login(email, password);
            res.status(200).json({ token });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }

}

export { PatientController };