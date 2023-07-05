import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";
console.clear();

// stan is nats client
const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  console.log("pubilisher connected to NATS");

  // const data = JSON.stringify({
  //   id: "123",
  //   title: "concert",
  //   price: 20,
  // });

  // stan.publish("ticket:created", data, () => {
  //   console.log("Event published");
  // });

  const pubilisher = new TicketCreatedPublisher(stan);
  try {
    await pubilisher.publish({ id: "123", title: "New Concert", price: 10 });
  } catch (err) {
    console.error(err);
  }
});
