import {Router} from 'express';
import { PatientController } from '../controllers/PatientController.mjs';
import { check } from 'express-validator';
import { authenticateJWT } from '../middlewares/auth.mjs';
import { authorizeRole } from '../middlewares/authorize.mjs';
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
            .route('/appointment')
            .get(authenticateJWT, authorizeRole('patient'),this.appointmentController.getAppointmentsByPatientId)
            .post(authenticateJWT, authorizeRole('patient'),this.appointmentController.createAppointment);
        this.router
            .route('/appointment/:appointmentId')
            .put(authenticateJWT, authorizeRole('patient'),
                [
                    check('doctorId').not().isEmpty().withMessage('Doctor ID is required'),
                    check('date').not().isEmpty().withMessage('Date is required'),
                    check('hour').not().isEmpty().withMessage('Hour is required')
                ],
                this.appointmentController.updateAppointment
            )
            .delete(authenticateJWT, authorizeRole('patient'),this.appointmentController.deleteAppointment);
    }
}

export { PatientRoutes };
