import { API } from "@/lib/axios";

export interface GetOrdersResponse {
  orders: {
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  }[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
}

interface GetOrdersParams {
  pageIndex?: number | null;
  customerName?: string | null;
  status?: string | null;
  orderId?: string | null;
}
export async function getOrders({
  pageIndex,
  orderId,
  customerName,
  status,
}: GetOrdersParams) {
  const response = await API.get<GetOrdersResponse>("/orders", {
    params: {
      pageIndex: pageIndex,
      orderId: orderId ?? null,
      customerName: customerName ?? null,
      status: status ?? null,
    },
  });

  return response.data;
}
