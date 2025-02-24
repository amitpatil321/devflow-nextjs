import mongoose from "mongoose";

let isConected = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) console.error("Missing mongodb url");

  if (isConected)
    return console.log("======= MongoDB is already connected! ==========");

  try {
    await mongoose.connect(process.env.MONGODB_URL as string, {
      dbName: "devflow",
    });
    isConected = true;
  } catch (error) {
    console.error("Error connecting mongoDB", error);
  }
};
