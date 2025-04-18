import { API } from "@/lib/axios";

interface DeliverOrderParams {
  orderId: string;
}
export async function deliverOrder({ orderId }: DeliverOrderParams) {
  await API.patch(`/orders/${orderId}/deliver`);
}
