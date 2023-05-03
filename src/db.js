import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useUnifiedTopology: false,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
db.on("error", (error) => console.log("❌ DB ERORR", error));
db.once("open", handleOpen);
