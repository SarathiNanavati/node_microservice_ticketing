import mongoose from "mongoose";
import { app as expressApp } from "./app";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY must be defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  try {
    await natsWrapper.connect(
      "ticketing-cluster-id",
      "asdfas",
      "http://ticketing-nats-srv:4222"
    );

    natsWrapper.client.on("close", () => {
      console.log("Nats connection Closed");
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    // connecting to moongoose
    await mongoose.connect(process.env.MONGO_URI);
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
