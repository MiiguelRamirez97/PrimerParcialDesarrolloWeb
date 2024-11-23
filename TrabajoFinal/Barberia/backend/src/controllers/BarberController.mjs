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

    getBarberByDocument = async(req, res) => {
        const barberDocument = req.params.barberDocument;

        try {
            const barber = await this.#service.getBarberByDocument(barberDocument);
            if (!barber) {
                return res.status(404).json({ message: 'Barber not found' });
            }
            res.status(200).json(barber);
        } catch (error) {
            res.status(500).json({ message: error.message });
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