import mongoose, { connect } from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {  //yeh batayega ki connect ho gya
            console.log("DataBase Connected");
        })
        await mongoose.connect(`${process.env.MONGODB_URI}/quickblog`)  //this will connect with mongoDb database
    }
    catch (error) {
        console.log(error.message)
    }
}

export default connectDB;