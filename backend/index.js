import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.routes.js";
import queryRoutes from "./routes/query.routes.js"
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  credentials: true,
}));

await connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

app.use("/hello", (req, res) => {
  res.send("API is running....");
});

app.use("/api/user", userRoutes);
app.use("/api/query", queryRoutes);