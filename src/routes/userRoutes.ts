import express, { Request, Response } from "express";

const router = express.Router();

router.get("/users", async (req: Request, res: Response) => {
  res.send("Get all users");
});

router.post("/users", async (req: Request, res: Response) => {
  res.send("add user");
});

export default router;
