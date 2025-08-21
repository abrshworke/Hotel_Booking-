
import Router from 'express';
import { createFeedback, getAllFeedback } from '../controller/FeedbackController.js';


const FeedbackRoute = Router(); 

FeedbackRoute.post('/send' ,createFeedback);
FeedbackRoute.get('/all', getAllFeedback);
   

export default FeedbackRoute;
 

 