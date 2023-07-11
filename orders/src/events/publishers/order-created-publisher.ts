import {
  OrderCreatedEvent,
  Pubilisher,
  Subjects,
} from "@microservice-ticketing/common";

export class OrderCreatedPublisher extends Pubilisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
