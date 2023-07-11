import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

const buildTicket = async () => {
  const ticket = Ticket.build({ title: "concert", price: Math.random() * 100 });
  await ticket.save();
  return ticket;
};

it("fetches the order for a particular user", async () => {
  const ticket1 = await buildTicket();

  const user = global.signin();

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket1.id })
    .expect(201);

  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(200);

  await request(app).get(`/api/orders/asd`).set("Cookie", user).expect(400);

  expect(fetchedOrder.id).toEqual(order.id);
});

it("fetches return an error if fetched by other user", async () => {
  const ticket1 = await buildTicket();

  const user = global.signin();

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket1.id })
    .expect(201);

  await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", global.signin())
    .send()
    .expect(401);
});
