import { Router } from 'express';
import { BarberController } from '../controllers/BarberController.mjs';

class BarberRoutes{
    constructor(){
        this.router = Router();
        this.controller = new BarberController();

        this.router
            .route("/get")
            .get(this.controller.getAllBarbers);

        this.router
        .route("/login")
        .post(this.controller.loginBarber.bind(this.controller));
    }

}

export { BarberRoutes };