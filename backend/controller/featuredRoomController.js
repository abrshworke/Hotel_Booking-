
import {v2 as cloudinary} from "cloudinary";
import HFeatureModel from "../model/HotelFeature.js";
import AmenitiesModel from "../model/Amenities.js";
import ExclusiveModel from "../model/ExclusiveOffer.js";

 
const HotelFeatures = async (req , res) => {
  
        try {
                const {name , hotelService , price } = req.body;
                const image1 = req.files.image1 && req.files.image1[0]

                const images = [image1 ].filter((item) => item !== undefined);
                
                let ImageURL = await Promise.all(
                        images.map(async (item) => {
                           let result = await cloudinary.uploader.upload(item.path , {resource_type: 'image'});
                           return result.secure_url
                        })
                )

                const HotelFeature = {
                    name,
                    hotelService : JSON.parse(hotelService), 
                    price: Number(price),
                    image: ImageURL[0],
                    
                };

                const HomePage = new HFeatureModel(HotelFeature);
                await HomePage.save();

                res.json({success: true , message : 'HotelFeature added successfully'})
                console.log(name   , price , ImageURL);
                console.log(ImageURL);
                
                res.json({})
        } catch (error) {
                console.log(error);
                res.json({success: false , message: error.message})
        }
 
}

const Amenities = async (req , res) => {
  
        try {
                const {title , description , icon } = req.body;
                const HotelAmenities = {
                    title,
                    description ,
                    icon
                };

                const HomePage = new AmenitiesModel(HotelAmenities);
                await HomePage.save();

                res.json({success: true , message : 'HotelFeature added successfully'})
                console.log(title , description , icon);
                
                res.json({})
        } catch (error) {
                console.log(error);
                res.json({success: false , message: error.message})
        }
}


const ExclusiveOffer = async (req , res) => {
  
        try {
                const {title , description , icon } = req.body;
                const ExclusiveOffer = {
                    title,
                    description ,
                    icon
                };

                const HomePage = new ExclusiveModel(ExclusiveOffer);
                await HomePage.save();

                res.json({success: true , message : 'HotelFeature added successfully'})
                console.log(title , description , icon);
                
                res.json({})
        } catch (error) {
                console.log(error);
                res.json({success: false , message: error.message})
        }
}





const allHotelFeature = async (req , res) => {

       try {
        const allHotelFeature = await HFeatureModel.find({})
        res.json({success : true ,allHotelFeature})
        
       } catch (error) {
                console.log(error);      
                res.json({success: false , message: error.message})
       }
}

const allAmenities = async (req , res) => {

       try {
        const allAmenities = await AmenitiesModel.find({})
        res.json({success : true ,allAmenities})
        
       } catch (error) {
                console.log(error);      
                res.json({success: false , message: error.message})
       }
}

const allExclusiveOffer = async (req , res) => {

       try {
        const allExclusiveOffer = await ExclusiveModel.find({})
        res.json({success : true ,allExclusiveOffer})
        
       } catch (error) {
                console.log(error);      
                res.json({success: false , message: error.message})
       }
}


const RemoveHotelFeature = async (req , res) => {

        try {

            await HFeatureModel.findByIdAndDelete(req.body.id)
            res.json({success: true , mesaage: 'product removed successfully'})
                
        } catch (error) {
               console.log(error);        
               res.json({success: false , message: error.message}) 
        }

}

const RemoveAmenities = async (req , res) => {

        try {

            await AmenitiesModel.findByIdAndDelete(req.body.id)
            res.json({success: true , mesaage: 'product removed successfully'})
                
        } catch (error) {
               console.log(error);        
               res.json({success: false , message: error.message}) 
        }

}

const RemoveExclusiveOffer = async (req , res) => {

        try {

            await ExclusiveModel.findByIdAndDelete(req.body.id)
            res.json({success: true , mesaage: 'product removed successfully'})
                
        } catch (error) {
               console.log(error);        
               res.json({success: false , message: error.message}) 
        }

}

export { HotelFeatures , Amenities , ExclusiveOffer , allHotelFeature , allAmenities , 
            allExclusiveOffer , RemoveHotelFeature , RemoveAmenities , RemoveExclusiveOffer };




