import { OrderStatus } from "@/pages/app/orders/order.status";
import { render } from "@testing-library/react";
describe("Order Status", () => {
  it("should display the right text when order status is pending", () => {
    const wrapper = render(<OrderStatus status="pending" />);

    const statusText = wrapper.getByText("Pendente");

    const badgeElement = wrapper.getByTestId("badge");
  });
});
