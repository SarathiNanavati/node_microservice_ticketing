import {
  Listener,
  Subjects,
  TicketUpdatedEvent,
} from "@microservice-ticketing/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    const { title, price, id, version } = data;

    const ticket = await Ticket.findPreviousVersionById(data);

    if (!ticket) {
      throw new Error("Ticket Not found");
    }

    ticket.set({ title, price });
    await ticket.save();

    msg.ack();
  }
}
