const videos = [
  {
    title: "The Beginning of Adventure",
    rating: 5,
    comment: 2,
    createAt: "2 minutes ago",
    views: 1,
    id: 1,
  },
  {
    title: "The Perfect Escape",
    rating: 4.5,
    comment: 10,
    createAt: "1 day ago",
    views: 127,
    id: 2,
  },
  {
    title: "Lost in the Wilderness",
    rating: 3.2,
    comment: 1,
    createAt: "2 hours ago",
    views: 13,
    id: 3,
  },
  {
    title: "Underwater Expedition",
    rating: 4.8,
    comment: 25,
    createAt: "1 week ago",
    views: 215,
    id: 4,
  },
  {
    title: "The Mysterious Mansion",
    rating: 3.9,
    comment: 7,
    createAt: "3 days ago",
    views: 85,
    id: 5,
  },
];

export const trendingVideos = (req, res) =>
  res.render("home", { pageTitle: "Home", videos });
export const watchVideo = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("watch", { pageTitle: `Watching ${video.title}`, video });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render(`edit`, { pageTitle: `Editing ${video.title}`, video });
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  videos[id - 1].title = title;
  return res.redirect(`/videos/${id}`);
};
export const deleteVideo = (req, res) => res.send("DELETE VIDEOE");
export const postUpload = (req, res) => {
  console.log(req.body.title);
  const newVideo = {
    title: req.body.title,
    rating: 0,
    comment: 0,
    createAt: "Just now",
    views: 0,
    id: videos.length + 1,
  };
  videos.push(newVideo);
  return res.redirect("/");
};
export const getUpload = (req, res) => {
  return res.render("upload");
};
