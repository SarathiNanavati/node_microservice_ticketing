import {
  Pubilisher,
  Subjects,
  TicketUpdatedEvent,
} from "@microservice-ticketing/common";

export class TicketUpdatedPublisher extends Pubilisher<TicketUpdatedEvent> {
  readonly subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
