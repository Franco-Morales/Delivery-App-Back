import mongoose from "mongoose";


const URI = process.env.MONGODB_URI || "mongodb://localhost:27017/del-app";


mongoose.connect(URI,{
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const connection = mongoose.connection;

try {
    connection.once('open', () => console.log('Database is connected'));
} catch (error) {
    console.error(error);
}


export default connection;