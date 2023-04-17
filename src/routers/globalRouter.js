import express from "express";
import { join, login, search } from "../controllers/userController";
import { trendingVideos } from "../controllers/videoController";

const globalRouter = express.Router();

globalRouter.get("/", trendingVideos);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/search", search);

export default globalRouter;
