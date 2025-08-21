
import { Router } from "express";
 
import upload from "../middleware/multer.js"
import adminAuth from "../middleware/adminAuth.js";
import { allAmenities, allExclusiveOffer, allHotelFeature, Amenities, ExclusiveOffer, HotelFeatures, RemoveAmenities, RemoveExclusiveOffer, RemoveHotelFeature } from "../controller/featuredRoomController.js";

const HotelRouter = Router();

HotelRouter.post('/feature/add', adminAuth,upload.fields([{name : "image1" , maxCount : 1}]) , HotelFeatures );
HotelRouter.get('/feature/all' , allHotelFeature );
HotelRouter.post('/feature/remove' ,adminAuth, adminAuth , RemoveHotelFeature);

HotelRouter.post('/amenities/add', adminAuth , Amenities );
HotelRouter.get('/amenities/all' , allAmenities );
HotelRouter.post('/amenities/remove' ,adminAuth, adminAuth , RemoveAmenities);

HotelRouter.post('/offer/add', adminAuth , ExclusiveOffer );
HotelRouter.get('/offer/all' , allExclusiveOffer );
HotelRouter.post('/offer/remove' ,adminAuth, adminAuth , RemoveExclusiveOffer);

export default HotelRouter;

