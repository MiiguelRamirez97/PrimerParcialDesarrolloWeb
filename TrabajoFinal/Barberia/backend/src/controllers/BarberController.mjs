import { BarberService } from "../services/BarberServices.mjs";
import { validationResult } from 'express-validator';

class BarberController {
    #service;
    constructor() {
        this.#service = new BarberService();
    }

    getAllBarbers = async (req, res) => {
        try {
            const barbers = await this.#service.getAllBarbers();
            res.status(200).json(barbers);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    loginBarber = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { email, password } = req.body;
            const token = await this.#service.loginBarber(email, password);
            res.status(200).json(token);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export { BarberController };