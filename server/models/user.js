import pkg from "mongoose";
const { Schema, model } = pkg;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = model("User", userSchema);

export default User;
