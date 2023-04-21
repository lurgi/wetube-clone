import "./db";
import "./models/Video";
import morgan from "morgan";
import express from "express";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRotuer";
import videoRouter from "./routers/videoRotuer";
const PORT = 4000;

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);

app.use(express.urlencoded({ extended: true }));
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);
app.listen(PORT, handleListening);