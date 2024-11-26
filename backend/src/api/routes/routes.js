import express from 'express';
import { Create } from '../controllers/stagiaire.controller.js';
import { create, findAll, findById, updateById } from '../controllers/condidat.controller.js';
import userController from '../controllers/user.controller.js';

const router = express.Router();

// Stagiaire routes

router.post('/stagiaires',Create);
//router.get('/stagiaire', FindAll);
//router.get('/stagiaire/:id', FindById);
//router.put('/stagiaire/edit/:id', UpdateById);

// Condidat routes
router.post('/condidats', create);
router.get('/condidat', findAll);
router.get('/condidat/:id', findById);
router.put('/condidat/edit/:id', updateById);

// User routes
router.post('/register', userController.register);
router.post('/login', userController.login);

export default router;
