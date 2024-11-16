import {Router} from 'express';
import { DoctorController } from '../controllers/DoctorController.mjs';
import { AppointmentController } from '../controllers/AppointmentController.mjs';
import { authenticateJWT } from '../middlewares/auth.mjs';
import { authorizeAnyRole } from '../middlewares/authorize.mjs';

class DoctorRoutes{
    constructor(){
        this.router = Router();
        this.controller = new DoctorController();
        this.controllerAppointments = new AppointmentController();
        this.router
            .route('/:doctorId')
            .get(authenticateJWT, authorizeAnyRole, this.controller.getDoctorById.bind(this.controller));
        this.router
            .route('/:doctorId/appointment')
            .get(authenticateJWT, authorizeAnyRole, this.controllerAppointments.getAppointmentsByDoctorId.bind(this.controller));
    }
}

export { DoctorRoutes };