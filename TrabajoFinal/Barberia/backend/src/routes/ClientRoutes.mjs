import { Router } from 'express';
import { ClientController } from '../controllers/ClientController.mjs';
import { check } from 'express-validator';
import { authenticateJWT } from '../middlewares/auth.mjs';
import { authorizeRole } from '../middlewares/authorize.mjs';

class ClientRoutes{
    constructor(){
        this.router = Router();
        this.controller = new ClientController();

        this.router
            .route("/byDocument")
            .get(authenticateJWT, authorizeRole('client'), this.controller.getClientByDocument.bind(this.controller));

        this.router
        .route("/login")
        .post(
            [
                check('email').isEmail().withMessage('Email is not valid'),
                check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
            ],
            this.controller.loginClient.bind(this.controller));
        this.router
            .route("/register")
            .post(
                [
                    check('email').isEmail().withMessage('Email is not valid'),
                    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
                    check('name').not().isEmpty().withMessage('Name is required'),
                    check('mobile').not().isEmpty().withMessage('Mobile is required'),
                    check('identification').not().isEmpty().withMessage('identification is required')
                ],
                this.controller.registerClient.bind(this.controller)
            );
    }
}

export { ClientRoutes };