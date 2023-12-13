import mongoose from "mongoose";

let isConected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConected) {
    console.log("Mongo is already connected");
    return;
  }
  //init connection
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      dbName: "searchK",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConected = true;
    console.log("Mongo connected");
  } catch (error) {
    console.log(error);
  }
};
