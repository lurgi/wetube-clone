export const trendingVideos = (req, res) =>
  res.render("home", { pageTitle: "Home" });
export const watchVideo = (req, res) => res.render(`watch`);
export const editVideo = (req, res) => res.render(`edit`);
export const deleteVideo = (req, res) => res.send("DELETE VIDEOE");
export const uploadVideo = (req, res) => res.send("UPLOAD");
