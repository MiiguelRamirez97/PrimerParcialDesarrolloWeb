import { Router } from 'express';
import { BarberController } from '../controllers/BarberController.mjs';
import { check } from 'express-validator';
import { authenticateJWT } from '../middlewares/auth.mjs';
import { authorizeRole } from '../middlewares/authorize.mjs';

class BarberRoutes{
    constructor(){
        this.router = Router();
        this.controller = new BarberController();

        this.router
            .route("/get")
            .get(authenticateJWT, authorizeRole('client'), this.controller.getAllBarbers);
        this.router
            .route("/byDocument/:barberDocument")
            .get(authenticateJWT, authorizeRole('client'), this.controller.getBarberByDocument.bind(this.controller));

        this.router
        .route("/login")
        .post(
            [
                check('email').isEmail().withMessage('Email is not valid'),
                check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
            ],
            this.controller.loginBarber.bind(this.controller));
    }

}

export { BarberRoutes };