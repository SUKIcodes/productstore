import express from "express";
const app = express();
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path"

import productRouter from "./routes/Product.js";

dotenv.config();
app.use(express.json());
app.use(cors());

const __dirname = path.resolve()

app.use("/api/products", productRouter);

app.use(express.static(path.join(__dirname,"/client/dist")))

app.get("*", (req, res) => {
res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
});



app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connection established...");
  })
  .catch((error) => {
    console.log(error.message);
  });
