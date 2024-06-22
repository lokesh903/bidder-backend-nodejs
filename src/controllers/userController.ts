import express from "express";
import Model from "../models/index";
import { authentication } from "../middlewares/authenticate";

const register = async (req: express.Request, res: express.Response) => {
  try {
    // Create a new instance of the User model
    const user = new Model.User(req.body);

    // Call the setPassword method to hash and set the password
    // const password = await user.setPassword(req.body.password);
    // user.password = password;
    // Save the user document to the database
    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    res.send(error);
  }
};

const login = async (req: express.Request, res: express.Response) => {
  try {
    // Create a new instance of the User model
    const user = new Model.User();

    const userData = await Model.User.findOne({
      email: req.body.email,
      isDeleted: false,
    });
    if (!userData) return res.status(404).json({ msg: "Not found" });

    //check for password validation
    const password = await user.authenticate(
      userData.password,
      req.body.password
    );
    if (password) {
      userData.accessToken = authentication({ _id: user._id });
      await userData.save();
      return res.status(200).json(userData);
    } else {
      return res.status(400).json({ msg: "wrong password" });
    }
  } catch (error) {
    res.send(error);
  }
};

const getAllUsers = async (req: express.Request, res: express.Response) => {
	try {
    console.log(req['user']);
	  const userData = await Model.User.find({
		isDeleted: false,
	  });

	  if (!userData.length) return res.status(404).json({ msg: "Not found" });

	  return res.status(200).json(userData);
	} catch (error) {
	  res.send(error);
	}
  };

export default {
  register,
  login,
  getAllUsers
};
