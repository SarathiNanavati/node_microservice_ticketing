import request from "supertest";

import mongoose from "mongoose";
import { app } from "../../app";

it("returns a 404 if this ticket is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/tickets/${id}`).send({}).expect(404);
});

it("returns a ticket if this ticket is  found", async () => {
  const title = "newtitle";
  const price = 20;

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title,
      price,
    })
    .expect(201);

  await request(app).get(`/api/tickets/${response.body.id}`).send().expect(200);

  expect(response.body.title).toEqual(title);
  expect(response.body.price).toEqual(price);
});
