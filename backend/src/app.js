import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: ["https://wedding-spark.vercel.app/"],
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(cookieParser());

// routes import
import userRouter from "./routes/user.routes.js";
import vendorRouter from "./routes/vendor.routes.js";

//router declaratioon
app.use("/users", userRouter);
app.use("/vendors", vendorRouter);

export { app };
