import express, { Request, Response } from "express";
import Joi from "joi";
import User, { IUser } from "../models/User";

const router = express.Router();

const createUserSchema = Joi.object({
  uid: Joi.string().required(),
  email: Joi.string().email().required(),
  role: Joi.string().required(),
  status: Joi.string().valid("in-progress", "approved", "suspended").required(),
  name: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }),
  phone: Joi.string().required(),
  occupation: Joi.string(),
  dateOfBirth: Joi.date().required(),
  gender: Joi.string().valid("male", "female", "prefer-not-answer").required(),
  photoUrl: Joi.string(),
  addresses: Joi.array().items(
    Joi.object({
      isDeleted: Joi.boolean().default(false),
      address: Joi.object({
        street: Joi.string().required(),
        city: Joi.string().required(),
        prefecture: Joi.string().required(),
        postalCode: Joi.string().required(),
        country: Joi.string().required(),
        buildingName: Joi.string().required(),
        roomNumber: Joi.string().required(),
        state: Joi.string(),
        details: Joi.string(),
      }),
    })
  ),
});

router.post("/users", async (req: Request, res: Response) => {
  try {
    const { error } = createUserSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const newUser: IUser = req.body;
    const createdUser = await User.create(newUser);
    console.log("User created: ", createdUser);
    return res.status(201).json(createdUser);
  } catch (error) {
    console.log("Error creating user: ", error);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/users", async (req: Request, res: Response) => {
  try {
    const { email, phone } = req.query;
    console.log(email, phone);
    if (!email && !phone) {
      return res.status(400).json({ error: "Email or phone is required" });
    }

    let user;

    if (email) {
      user = await User.find({ email: email as string });
    } else if (phone) {
      user = await User.find({ phone: phone as string });
    }
    console.log("user found:", user);
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error finding user: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
