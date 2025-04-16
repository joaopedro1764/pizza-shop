import { API } from "@/lib/axios";

interface GetOrderDetailsParams {
  orderId: string;
}

export type GetOrderDetailsResponse = {
  orderId: string;
  createdAt: string;
  status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
  totalInCents: number;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  orderItems: {
    id: string;
    priceInCents: number;
    quantity: number;
    product: {
      name: string;
    };
  }[];
};

export async function getOrderDetails({ orderId }: GetOrderDetailsParams) {
  const response = await API.get<GetOrderDetailsResponse>(`/orders/${orderId}`);

  return response.data;
}
