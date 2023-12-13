import { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email is already exists!"],
    required: [true, "Emais is required!!"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    match: [],
  },
  image: {
    type: String,
  },
});

//check if exists this model in database
const User = models.User || model("User", UserSchema);

export default User;
