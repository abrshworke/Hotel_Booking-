
// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import assets from "../assets/assets"


// const AMENITIES_OPTIONS = ["wifi", "pool", "gym", "parking"];

// const AddRoom = ({token}) => {

//   const [image1 , setImage1] = useState(false);
//   const [image2 , setImage2] = useState(false);
//   const [image3 , setImage3] = useState(false);
//   const [image4 , setImage4] = useState(false);
//   const [files, setFiles] = useState([]);
//   const [name, setName] = useState('');
//   const [aboutRoom, setAboutRoom] = useState('');
//   const [type, setType] = useState('suite');
//   const [amenities, setAmenities] = useState([]);
//   const [maxGuests, setMaxGuests] = useState('');
//   const [price, setPrice] = useState('');

//   const toggleAmenity = (amenity) => {
//     setAmenities((prev) =>
//       prev.includes(amenity)
//         ? prev.filter((a) => a !== amenity)
//         : [...prev, amenity]
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {

//       const formData = new FormData();

//       image1 && formData.append("image1" , image1);
//       image2 && formData.append("image2" , image2)
//       image3 && formData.append("image3" , image3)
//       image4 && formData.append("image4" , image4)

//       formData.append("name" , name);
//       formData.append("aboutRoom" , aboutRoom);
//       formData.append("type", type);
//       formData.append("price", price);
//       formData.append("maxGuests" , maxGuests);
//       formData.append("amenities", JSON.stringify(amenities));

//       const response = await axios.post(
//         "http://localhost:7000/api/room/add",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,  // <-- Correct header key and format
//             "Content-Type": "multipart/form-data", // also good to set since uploading files
//           },
//         }
//       );

//       if (response.data.success) {
//         toast.success(response.data.message)

//         setName('');
//         setAboutRoom('');
//         setType('');
//         setPrice('');
//         setAmenities([]);
//         setMaxGuests('');

//         setImage1(false);
//         setImage2(false);
//         setImage3(false);
//         setImage4(false);

//       } else {
//         toast.error(response.data.message)
//       }
      
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message)
//     }
//   };

//   return (
//     <div className="flex-1 min-h-screen flex flex-col justify-between">
//       <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
//         <div>
//           <p className="text-base font-medium">Room Image</p>
//           <div className="flex flex-wrap items-center gap-3 mt-2">

//               <label htmlFor="image1">
//                 <img className="w-20 cursor-pointer" src={!image1 ? assets.upload : URL.createObjectURL(image1 )} alt="" />
//                 <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
//               </label>

//                <label htmlFor="image2">
//                 <img className=" cursor-pointer w-20" src={!image2 ? assets.upload : URL.createObjectURL(image2 )} alt="" />
//                 <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
//               </label>
                  
//               <label htmlFor="image3">
//                 <img className="w-20 cursor-pointer" src={!image3 ? assets.upload : URL.createObjectURL(image3)} alt="" />
//                 <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
//               </label>

//                <label htmlFor="image4">
//                 <img className="w-20 cursor-pointer" src={!image4 ? assets.upload : URL.createObjectURL(image4)} alt="" />
//                 <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
//               </label>
                   
//           </div>
//         </div>
//         <div className="flex flex-col gap-1 max-w-md">
//           <label className="text-base font-medium" htmlFor="product-name">
//             Product Name
//           </label>
//           <input
//             id="product-name"
//             type="text"
//             placeholder="Type here"
//             className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
//             onChange={(e) => setName(e.target.value)}
//             value={name}
//             required
//           />
//         </div>
//         <div className="flex flex-col gap-1 max-w-md">
//           <label
//             className="text-base font-medium"
//             htmlFor="product-description"
//           >
//              about Room
//           </label>
//           <textarea
//             id=" aboutRoom"
//             rows={4}
//             className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
//             placeholder="Type here"
//             onChange={(e) => setAboutRoom(e.target.value)}
//             value={aboutRoom}
//             required
//           ></textarea>
//         </div>
//         <div className="flex items-center gap-5 flex-wrap">
//           <div className="flex flex-col gap-1 w-32">
//             <label className="text-base font-medium" htmlFor="category">
//               Type
//             </label>
//             <select
//               id="category"
//               className="outline-none md:py-2.5 py-2 px-3 cursor-pointer rounded border border-gray-500/40"
//               onChange={(e) => setType(e.target.value)}
//               defaultValue={type}
//             >
//               <option value="single">single</option>
//               <option value="double">double</option>
//               <option value="suite">suite</option>
//               <option value="deluxe">deluxe</option>
              
//             </select>
//           </div>
//           <div className="flex flex-col gap-1 w-32">
//             <label className="text-base font-medium" htmlFor="product-price">
//               Room Price
//             </label>
//             <input
//               id="product-price"
//               type="number"
//               placeholder="0"
//               className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
//               onChange={(e) => setPrice(e.target.value)}
//               value={price}
//               required
//             />
//           </div>
//           <div className="flex flex-col gap-1 w-32">
//             <label className="text-base font-medium" htmlFor="max-guests">
//               Max Guests
//             </label>
//             <input
//               id="max-guests"
//               type="number"
//               placeholder="0"
//               className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
//               onChange={(e) => setMaxGuests(e.target.value)}
//               value={maxGuests}
//               required
//             />

//           </div>     

//           <div>
//           <p className="text-base font-medium mb-2">Amenities</p>
//           <div className="flex gap-4 flex-wrap">
//             {AMENITIES_OPTIONS.map((amenity) => (
//               <label key={amenity} className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   value={amenity}
//                   checked={amenities.includes(amenity)}
//                   onChange={() => toggleAmenity(amenity)}
//                 />
//                 <span className="capitalize">{amenity}</span>
//               </label>
//             ))}
//           </div>
//         </div>
 
//         </div>
//         <button type="submit" className="px-8 py-2.5 cursor-pointer bg-orange-600 text-white font-medium rounded">
//           ADD
//         </button>
//       </form>
      
//     </div>
//   );  
// };

// export default AddRoom;




import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import assets from "../assets/assets";

const AMENITIES_OPTIONS = ["wifi", "pool", "gym", "parking"];

const AddRoom = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [aboutRoom, setAboutRoom] = useState("");
  const [type, setType] = useState("suite");
  const [amenities, setAmenities] = useState([]);
  const [maxGuests, setMaxGuests] = useState("");
  const [price, setPrice] = useState("");

  const toggleAmenity = (amenity) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const resetForm = () => {
    setImages([null, null, null, null]);
    setName("");
    setAboutRoom("");
    setType("suite");
    setAmenities([]);
    setMaxGuests("");
    setPrice("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !aboutRoom || !price || !maxGuests) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const formData = new FormData();

      images.forEach((img, i) => {
        if (img) formData.append(`image${i + 1}`, img);
      });

      formData.append("name", name);
      formData.append("aboutRoom", aboutRoom);
      formData.append("type", type);
      formData.append("price", price);
      formData.append("maxGuests", maxGuests);
      formData.append("amenities", JSON.stringify(amenities));

      const response = await axios.post(
        "http://localhost:7000/api/room/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        resetForm();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to add room.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Add New Room</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Images Upload */}
        <div>
          <p className="font-semibold mb-2">Room Images (up to 4)</p>
          <div className="flex gap-4 flex-wrap">
            {images.map((img, i) => (
              <label
                key={i}
                className="relative cursor-pointer w-24 h-24 border border-dashed rounded-lg overflow-hidden flex items-center justify-center bg-gray-50 hover:bg-gray-100"
              >
                {img ? (
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`Room Image ${i + 1}`}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <img
                    src={assets.upload}
                    alt="Upload Icon"
                    className="w-12 h-12 opacity-50"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(i, e.target.files[0])}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Name */}
        <div>
          <label
            htmlFor="room-name"
            className="block text-sm font-medium mb-1"
          >
            Room Name <span className="text-red-500">*</span>
          </label>
          <input
            id="room-name"
            type="text"
            placeholder="Enter room name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* About Room */}
        <div>
          <label
            htmlFor="about-room"
            className="block text-sm font-medium mb-1"
          >
            About Room <span className="text-red-500">*</span>
          </label>
          <textarea
            id="about-room"
            rows={4}
            placeholder="Describe the room"
            value={aboutRoom}
            onChange={(e) => setAboutRoom(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Type, Price, Max Guests */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="room-type"
              className="block text-sm font-medium mb-1"
            >
              Room Type
            </label>
            <select
              id="room-type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-2 border rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="single">Single</option>
              <option value="double">Double</option>
              <option value="suite">Suite</option>
              <option value="deluxe">Deluxe</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium mb-1"
            >
              Price per Night <span className="text-red-500">*</span>
            </label>
            <input
              id="price"
              type="number"
              min="0"
              placeholder="e.g. 150"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label
              htmlFor="max-guests"
              className="block text-sm font-medium mb-1"
            >
              Max Guests <span className="text-red-500">*</span>
            </label>
            <input
              id="max-guests"
              type="number"
              min="1"
              max="20"
              placeholder="e.g. 3"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        {/* Amenities */}
        <div>
          <p className="font-semibold mb-2">Amenities</p>
          <div className="flex gap-6 flex-wrap">
            {AMENITIES_OPTIONS.map((amenity) => (
              <label
                key={amenity}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  value={amenity}
                  checked={amenities.includes(amenity)}
                  onChange={() => toggleAmenity(amenity)}
                  className="w-5 h-5 rounded border-gray-300 focus:ring-yellow-400"
                />
                <span className="capitalize">{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-lg transition-transform hover:scale-105"
        >
          Add Room
        </button>
      </form>
    </div>
  );
};

export default AddRoom;
