import { BarberService } from "../services/BarberServices.mjs";

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
        try {
            const { email, password } = req.body;
            const barber = await this.#service.loginBarber(email, password);
            res.status(200).json(barber);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export { BarberController };