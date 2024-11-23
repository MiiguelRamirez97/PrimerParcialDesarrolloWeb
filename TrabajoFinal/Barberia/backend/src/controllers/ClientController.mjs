import { ClientService } from "../services/ClientServices.mjs";
import { validationResult } from 'express-validator';

class ClientController {
    #service;
    constructor() {
        this.#service = new ClientService();
    }

    getAllClients = async (req, res) => {
        try {
            const clients = await this.#service.getAllClients();
            res.status(200).json(clients);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    loginClient = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { email, password } = req.body;
            const token = await this.#service.loginClient(email, password);
            res.status(200).json(token);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export  { ClientController };