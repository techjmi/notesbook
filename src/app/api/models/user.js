
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  image: {
    type: String,
    default: "https://www.w3schools.com/w3images/avatar2.png",
  },
  password: {
    type: String,
    required: false,
  },
}, { timestamps: true });

const N_User = mongoose.models.N_User || mongoose.model("N_User", userSchema);
export default N_User;
