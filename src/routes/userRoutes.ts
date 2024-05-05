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

    return res.status(201).json(createdUser);
  } catch (error) {
    console.log("Error creating user: ", error);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/users", async (req: Request, res: Response) => {
  res.send("Get all users");
});

export default router;
