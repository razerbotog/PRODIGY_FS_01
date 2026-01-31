import mongoose from "mongoose"

export async function connectDB() {
  try {
    console.log("Connection ready state of db: ", mongoose.connection.readyState);
    
    if (mongoose.connection.readyState >= 1) return
    console.log("Making a connection ready state");
    await mongoose.connect(process.env.MONGO_URI + "/cluster0")
    console.log("Successfully connected to database");
  } catch (error) {
    console.log("Something went wrong while connecting to database\n", error.errorResponse);
    
  }
}
