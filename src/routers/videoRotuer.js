import express from "express";
import {
  editVideo,
  uploadVideo,
  watchVideo,
  deleteVideo,
  trendingVideos,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/", trendingVideos);
videoRouter.get("/:id(\\d+)", watchVideo);
videoRouter.get("/:id(\\d+)/edit", editVideo);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);
videoRouter.get("/upload", uploadVideo);

export default videoRouter;
