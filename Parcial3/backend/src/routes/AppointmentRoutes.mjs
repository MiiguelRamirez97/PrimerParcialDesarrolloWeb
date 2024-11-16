import {Router} from 'express';
import { AppointmentController } from '../controllers/AppointmentController.mjs';

class AppointmentRoutes{
    constructor(){
        this.router = Router();
        this.controller = new AppointmentController();
    }
}

export { AppointmentRoutes};