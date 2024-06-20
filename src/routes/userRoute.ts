import express from 'express';

import userController from "../controllers/userController";
import { verify } from '../middlewares/authenticate';


export default (router: express.Router) => {
  router.post('/auth/register', userController.register);
  router.post('/auth/login', userController.login);
  router.get('/user/getAllUser' ,userController.getAllUsers);

};