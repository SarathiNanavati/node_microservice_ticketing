import {
  OrderCancelledEvent,
  Pubilisher,
  Subjects,
} from "@microservice-ticketing/common";

export class OrderCancelledPublisher extends Pubilisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
