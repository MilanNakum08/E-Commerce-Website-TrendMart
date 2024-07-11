import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base
//middleware ma  args hoi call back function ma next(new1),
// req jyare get krie tyare next validate thai pachhi res send thai

export const requireSignIn = async (req, res, next) => { 
  try {
    const decode = JWT.verify( //compare mate
      req.headers.authorization,//token header ma hoi
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(200).send({
        success: false,
        message: "UnAuthorized Access",
      }); 
    } else {
      next(); // pass control to the next middleware or route handler.
    }
  } catch (error) {
    console.log(error);
  }
};