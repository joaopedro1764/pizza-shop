import { API } from "@/lib/axios";

interface ApproveOrderParams {
  orderId: string;
}
export async function approveOrder({ orderId }: ApproveOrderParams) {
  await API.patch(`/orders/${orderId}/approve`);
}
