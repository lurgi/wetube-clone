import express from "express";
import {
  logout,
  seeUser,
  editUser,
  deleteUser,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", editUser);
userRouter.get("/delete", deleteUser);
userRouter.get("/:id", seeUser);

export default userRouter;
