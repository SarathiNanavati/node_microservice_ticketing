import {
  Pubilisher,
  Subjects,
  TicketCreatedEvent,
} from "@microservice-ticketing/common";

export class TicketCreatedPublisher extends Pubilisher<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
