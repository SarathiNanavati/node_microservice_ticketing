import { randomBytes } from "crypto";
import nats from "node-nats-streaming";
import { TicketCreatedListener } from "./events/ticket-created-listener";
console.clear();

// stan is nats client
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("listener connected to NATS");

  stan.on("close", () => {
    console.log("Nats connection Closed");
    process.exit();
  });

  // const options = stan
  //   .subscriptionOptions()
  //   .setManualAckMode(true)
  //   .setDeliverAllAvailable()
  //   .setDurableName("accounting-service");

  // const subscrption = stan.subscribe(
  //   "ticket:created",
  //   "order-service-queue-group",
  //   options
  // );

  // subscrption.on("message", (msg: Message) => {
  //   console.log(
  //     "Message Received",
  //     msg.getSubject(),
  //     msg.getSequence(),
  //     msg.getData()
  //   );

  //   const data = msg.getData();
  //   if (typeof data === "string") {
  //     console.log(
  //       `Received event #${msg.getSequence()}, with data : ${JSON.parse(data)}`
  //     );
  //   }
  //   msg.ack();
  // });

  new TicketCreatedListener(stan).listen();
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
