import { Router } from 'express';
import { check } from 'express-validator';
import { AppointmentController } from '../controllers/AppointmentController.mjs';
import { authenticateJWT } from '../middlewares/auth.mjs';
import { authorizeRole } from '../middlewares/authorize.mjs';

class AppointmentRoutes{
    constructor(){
        this.router = Router();
        this.controller = new AppointmentController();

        this.router
            .route("/create")
            .post(this.controller.createAppointment.bind(this.controller));

    }
}

export { AppointmentRoutes };