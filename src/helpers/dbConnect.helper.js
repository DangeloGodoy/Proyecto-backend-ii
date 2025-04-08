import { connect } from "mongoose"

const dbConnect = async () => {
    try {
        connect(process.env.MONGO_URL)
        console.log("MongoDB connected");
    } catch (error) {
        console.log("MongoDB connection error");
    }
}

export default dbConnect;