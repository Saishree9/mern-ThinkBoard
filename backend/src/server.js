import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
// import ratelimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

app.use(express.json()); //middleware - allows access to req.body -- parse JSON bodies
// app.use(ratelimiter);

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use((req, res, next) => {
  console.log(`req method is ${req.method} & req url is ${req.url}`);
  next();
});

app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
  console.log(`server started on PORT: ${PORT}`);
});
