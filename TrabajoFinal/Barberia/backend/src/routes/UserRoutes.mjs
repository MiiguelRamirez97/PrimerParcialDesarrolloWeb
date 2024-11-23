import e, { Router } from 'express';
import { UserController } from '../controllers/UserController.mjs';
import { check } from 'express-validator';

class UserRoutes{
    constructor(){
        this.router = Router();
        this.controller = new UserController();

        this.router
        .route("/login")
        .post(
            [
                check('email').isEmail().withMessage('Email is not valid'),
                check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
            ],
            this.controller.login.bind(this.controller));
    }
}

export { UserRoutes };