import { API } from "@/lib/axios";

interface DispatchOrderParams {
  orderId: string;
}
export async function dispatchOrder({ orderId }: DispatchOrderParams) {
  await API.patch(`/orders/${orderId}/dispatch`);
}
