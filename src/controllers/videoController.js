import User from "../models/User";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({})
      .sort({ createdAt: "desc" })
      .populate("owner");
    return res.render("home", { pageTitle: "Home", videos });
  } catch {
    return res.render("server-error");
  }
};
export const watchVideo = async (req, res) => {
  const { id } = req.params;
  const video = await (await Video.findById(id)).populate("owner");
  if (!video) return res.render("404", { pageTitle: "Video not found" });
  return res.render("watch", { pageTitle: `${video.title}`, video });
};
export const getEdit = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    params: { id },
  } = req;
  const video = await Video.findById(id);
  if (!video) return res.render("404", { pageTitle: " Video not found" });
  if (video.owner + "" !== _id + "") {
    req.flash("error", "not athorized");
    return res.status(403).redirect("/");
  }
  return res.render(`edit`, { pageTitle: `Edit : ${video.title}`, video });
};
export const postEdit = async (req, res) => {
  const { id } = req.params;
  const {
    body: { title, description, hashtags },
  } = req;
  const video = await Video.exists({ _id: id });
  if (!video)
    return res.status(404).render("404", { pageTitle: "Vieo not found" });
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
};

export const postUpload = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    file: { path: fileUrl },
    body: { title, description, hashtags },
  } = req;

  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    return res.status(404).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};
export const search = async (req, res) => {
  const { keyword } = req.query;
  if (keyword) {
    const videos = await Video.find({
      title: {
        $regex: new RegExp(`${keyword}`, "i"),
      },
    })
      .sort({ createdAt: "desc" })
      .populate("owner");
    return res.render("search", { pageTitle: "Search", videos });
  }
  return res.render("search", { pageTitle: "Search" });
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};
