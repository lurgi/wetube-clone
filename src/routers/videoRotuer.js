import express from "express";
import {
  watchVideo,
  deleteVideo,
  getEdit,
  postEdit,
  postUpload,
  getUpload,
} from "../controllers/videoController";
import { avatarUpload, videoUpload } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watchVideo);
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .get(getEdit)
  .post(avatarUpload.single("avatar"), postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").get(deleteVideo);
videoRouter
  .route("/upload")
  .get(getUpload)
  .post(videoUpload.single("video"), postUpload);

export default videoRouter;
