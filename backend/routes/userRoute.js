

import Router from 'express';
import { AdminLogin, getMe, UserLogin, UserRegister } from '../controller/userController.js';


const UserRoute = Router(); 

UserRoute.post('/register' , UserRegister); 
UserRoute.post('/login' , UserLogin);
UserRoute.post('/admin' , AdminLogin);
UserRoute.get('/me' , getMe);

export default UserRoute;
 
 