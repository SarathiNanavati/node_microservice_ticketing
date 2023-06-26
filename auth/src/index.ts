import mongoose from "mongoose";
import { app as expressApp } from "./app";

const start = async () => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY must be defined");
  }

  try {
    await mongoose.connect("mongodb://ticketing-auth-mongo-srv:27019/auth");
    console.log("Connected to mongoDb!");
  } catch (err) {
    console.error(err);
  }
  const port = 3000;
  expressApp.listen(port, () => {
    console.log(`Listening on port ${port}!!`);
  });
};

start();
