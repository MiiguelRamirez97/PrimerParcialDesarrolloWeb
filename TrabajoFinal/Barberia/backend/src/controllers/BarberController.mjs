import { BarberService } from "../services/BarberServices.mjs";

class BarberController {
    #service;
    constructor() {
        this.#service = new BarberService();
    }

    getAllBarbers = async (req, res) => {
        try {
            const barbers = await this.#service.getAllBarbers();
            console.log("Barbers", barbers);
            res.status(200).json(barbers);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export { BarberController };