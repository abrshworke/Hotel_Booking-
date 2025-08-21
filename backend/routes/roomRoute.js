
import { Router } from "express";
 
import upload from "../middleware/multer.js"
import adminAuth from "../middleware/adminAuth.js";
import { AddRoom, allRoom, RemoveRoom, SingleRoom, UpdateRoom } from "../controller/roomController.js";

const RoomRouter = Router();

RoomRouter.post('/add', adminAuth,upload.fields([{name : "image1" , maxCount : 1} , {name : "image2" , maxCount : 1} ,{name : "image3" , maxCount : 1},{name : "image4" , maxCount : 1}]) , AddRoom);
RoomRouter.post('/update' ,upload.fields([{name : "image1" , maxCount : 1} , {name : "image2" , maxCount : 1} ,{name : "image3" , maxCount : 1},{name : "image4" , maxCount : 1}]) , UpdateRoom);
RoomRouter.post('/single' , SingleRoom);
RoomRouter.get('/all' , allRoom);
RoomRouter.post('/remove' , adminAuth , RemoveRoom);

export default RoomRouter;

