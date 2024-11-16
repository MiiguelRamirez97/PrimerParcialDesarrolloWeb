import {Router} from 'express';
import { PatientController } from '../controllers/PatientController.mjs';
import { check } from 'express-validator';
import authMiddleware from '../middlewares/authMiddleware.mjs';

class PatientRoutes {
    constructor() {
        this.router = Router();
        this.controller = new PatientController();
        this.router
            .route('/login')
            .post([
                check('email').isEmail().withMessage('Email is not valid'),
                check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
            ],
            this.controller.login.bind(this.controller));
    }
}

export { PatientRoutes };
