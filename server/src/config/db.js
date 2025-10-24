import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.log("Failed !!!", error);
  }
}

export default connect