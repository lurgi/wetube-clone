import express from "express";
import {
  watchVideo,
  deleteVideo,
  trendingVideos,
  getEdit,
  postEdit,
  postUpload,
  getUpload,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/", trendingVideos);
videoRouter.get("/:id(\\d+)", watchVideo);
// videoRouter.get("/:id(\\d+)/edit", getEdit);
// videoRouter.post("/:id(\\d+)/edit", postEdit);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
// videoRouter.get("/:id(\\d+)/delete", deleteVideo);
videoRouter.route("/upload").get(getUpload).post(postUpload);

export default videoRouter;
