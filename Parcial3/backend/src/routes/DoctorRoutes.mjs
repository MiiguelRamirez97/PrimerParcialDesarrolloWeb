import {Router} from 'express';
import { DoctorController } from '../controllers/DoctorController.mjs';
import { AppointmentController } from '../controllers/AppointmentController.mjs';

class DoctorRoutes{
    constructor(){
        this.router = Router();
        this.controller = new DoctorController();
        this.controllerAppointments = new AppointmentController();
        this.router
            .route('/:doctorId')
            .get(this.controller.getDoctorById.bind(this.controller));
        this.router
            .route('/:doctorId/appointment')
            .get(this.controllerAppointments.getAppointmentsByDoctorId.bind(this.controller));
    }
}

export { DoctorRoutes };