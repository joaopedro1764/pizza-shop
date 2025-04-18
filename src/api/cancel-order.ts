import { API } from "@/lib/axios";

interface CancelOrderParams {
  orderId: string;
}
export async function cancelOrder({ orderId }: CancelOrderParams) {
  await API.patch(`/orders/${orderId}/cancel`);
}
