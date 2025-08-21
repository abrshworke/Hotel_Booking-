import mongoose from 'mongoose';
 
const ConnectDataBase = async () => { 

    mongoose.connection.on('connected' , () => {
       console.log('MongoDB connected successfully');     
    }) 

mongoose.connect(`${process.env.MONGO_URI}/Hotel` , {
     useNewUrlParser: true,
     useUnifiedTopology: true 
} 

); };

export default ConnectDataBase;
 



