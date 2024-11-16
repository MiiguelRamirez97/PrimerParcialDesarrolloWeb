import {Router} from 'express';
import { DoctorController } from '../controllers/DoctorController.mjs';

class DoctorRoutes{
    constructor(){
        this.router = Router();
        this.controller = new DoctorController();
        this.router
            .route('/:doctorId')
            .get(this.controller.getDoctorById.bind(this.controller));
    }
}

export { DoctorRoutes };