
import {v2 as cloudinary} from "cloudinary";
import RoomModel from "../model/room.js";


const AddRoom = async (req , res) => {
  
        try {
                const {name , aboutRoom , type  , price , amenities , maxGuests} = req.body;
                
                const image1 = req.files.image1 && req.files.image1[0]
                const image2 = req.files.image2 && req.files.image2[0]
                const image3 = req.files.image3 && req.files.image3[0]
                const image4 = req.files.image4 && req.files.image4[0]

                const images = [image1 , image2 , image3 , image4].filter((item) => item !== undefined);

                let ImageURL = await Promise.all(
                        images.map(async (item) => {
                           let result = await cloudinary.uploader.upload(item.path , {resource_type: 'image'});
                           return result.secure_url
                        })
                )

                const RoomData = {
                    name,
                    aboutRoom,
                    price: Number(price),
                    type,
                    maxGuests: Number(maxGuests),
                    amenities: JSON.parse(amenities), 
                    image: ImageURL,
                };

                const Room = new RoomModel(RoomData);
                await Room.save();

                res.json({success: true , message : 'Product added successfully'})
                console.log(name , aboutRoom , type , amenities, maxGuests , price , ImageURL);
                console.log(ImageURL);
                
                res.json({})
        } catch (error) {
                console.log(error);
                res.json({success: false , message: error.message})
        }
 
}

 
const SingleRoom = async (req, res) => {
  try {
    const { id, RoomID } = req.body;
    const room = await RoomModel.findById(id || RoomID);
    res.json({ success: true, room });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



const allRoom = async (req , res) => {
       try {

        const allRoom = await RoomModel.find({})
        res.json({success : true ,allRoom})
        
       } catch (error) {
                console.log(error);      
                res.json({success: false , message: error.message})
       }
}


const RemoveRoom = async (req , res) => {

        try {

            await RoomModel.findByIdAndDelete(req.body.id)
            res.json({success: true , mesaage: 'product removed successfully'})
                
        } catch (error) {
               console.log(error);        
               res.json({success: false , message: error.message}) 
        }


}



const UpdateRoom = async (req, res) => {
  try {
    const { id, name, aboutRoom, type, amenities, price, maxGuests } = req.body;

    // Handle image uploads if new images are sent
    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const images = [image1, image2, image3, image4].filter(Boolean);

    let ImageURL = [];
    if (images.length > 0) {
      ImageURL = await Promise.all(
        images.map(async (item) => {
          const result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          });
          return result.secure_url;
        })
      );
    }

    const updateFields = {
        name,
        aboutRoom,
        price: Number(price),
        type,
        amenities: JSON.parse(amenities), 
        image: ImageURL,
        maxGuests: Number(maxGuests),
    
    };

    // Only update image field if new images are provided
    if (ImageURL.length > 0) {
      updateFields.image = ImageURL;
    }

    const updated = await RoomModel.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    res.json({ success: true, message: "Product updated", updated });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { AddRoom, SingleRoom, allRoom, RemoveRoom, UpdateRoom };


