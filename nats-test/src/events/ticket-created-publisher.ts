import { Pubilisher } from "./base-publisher";
import { Subjects } from "./subjects";
import { TicketCreatedEvent } from "./ticket-created-events";

export class TicketCreatedPublisher extends Pubilisher<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
