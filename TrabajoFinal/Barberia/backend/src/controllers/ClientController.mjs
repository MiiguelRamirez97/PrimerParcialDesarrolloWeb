import { ClientService } from "../services/ClientServices.mjs";
import { validationResult } from 'express-validator';

class ClientController {
    #service;
    constructor() {
        this.#service = new ClientService();
    }

    getClientByDocument = async(req, res) => {
        const clientDocument = req.user.id;

        try {
            const client = await this.#service.getClientByDocument(clientDocument);
            if (!client) {
                return res.status(404).json({ message: 'Client not found' });
            }
            res.status(200).json(client);
        } catch (error) {
            res.status(500).json({ message: error.message });
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

    registerClient = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password, name, mobile, identification } = req.body;

        try {
            const client = await this.#service.registerClient(email, password, name, mobile, identification);
            res.status(201).json(client);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

export  { ClientController };