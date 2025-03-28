import { API } from "@/lib/axios";

interface GetOrdersResponse {
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
}
export async function getOrders({ pageIndex }: GetOrdersParams) {
  const response = await API.get<GetOrdersResponse>("/orders", {
    params: {
      pageIndex: pageIndex,
    },
  });

  return response.data;
}
