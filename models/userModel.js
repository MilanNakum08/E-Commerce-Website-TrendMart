import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    //Defines a schema for the users collection in MongoDB.
    name: {
      type: String,
      required: true,
      trim: true, // white space remove
    },
    email: {
      type: String,
      required: true,
      unique: true, //ek email id thi ek user login thavo joie
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: {},
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
); //adds createdAt and updatedAt fields

export default mongoose.model("users", userSchema); //refernce chhe-userSchema
//Compiles the schema into a model.
