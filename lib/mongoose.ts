import mongoose from "mongoose";

let isConected = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) console.error("Missing mongodb url");

  if (isConected) return false;

  try {
    await mongoose.connect(process.env.MONGODB_URL as string, {
      dbName: "devflow",
    });
    isConected = true;
  } catch (error: any) {
    if (error.message.includes("ENOTFOUND")) {
      console.error("❌ Internet connection issue: Cannot reach MongoDB.");
    } else if (error.message.includes("ECONNREFUSED")) {
      console.error("❌ MongoDB server refused the connection.");
    } else if (error.message.includes("ECONNRESET")) {
      console.error("❌ MongoDB server connection error.");
    } else {
      console.error("❌ Error connecting to MongoDB:", error);
    }
  }
};
