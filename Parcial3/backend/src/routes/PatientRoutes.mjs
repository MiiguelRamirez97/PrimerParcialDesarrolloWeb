import {Router} from 'express';
import { PatientController } from '../controllers/PatientController.mjs';
import { check } from 'express-validator';
import authMiddleware from '../middlewares/authMiddleware.mjs';
import { AppointmentController } from '../controllers/AppointmentController.mjs';

class PatientRoutes {
    constructor() {
        this.router = Router();
        this.controller = new PatientController();
        this.appointmentController = new AppointmentController();
        this.router
            .route('/login')
            .post([
                check('email').isEmail().withMessage('Email is not valid'),
                check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
            ],
            this.controller.login.bind(this.controller));
        this.router
            .route('/:patientId/appointment')
            .get(this.appointmentController.getAppointmentsByPatientId)
            .post(this.appointmentController.createAppointment);
    }
}

export { PatientRoutes };
