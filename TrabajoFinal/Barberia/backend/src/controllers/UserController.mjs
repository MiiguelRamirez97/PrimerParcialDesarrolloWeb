import { validationResult } from 'express-validator';
import { UserService } from "../services/UserServices.mjs";

class UserController {
    #service;
    constructor() {
        this.#service = new UserService();
    }

    login = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { email, password } = req.body;
            const token = await this.#service.login(email, password);
            res.status(200).json(token);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export { UserController };