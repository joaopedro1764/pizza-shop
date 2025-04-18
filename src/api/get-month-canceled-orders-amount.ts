import { API } from "@/lib/axios";

export interface GetMonthCanceledOrdersAmount {
  amount: number;
  diffFromLastMonth: number;
}

export async function getMonthCanceledOrdersAmount() {
  const response = await API.get<GetMonthCanceledOrdersAmount>(
    "/metrics/month-canceled-orders-amount",
  );

  return response.data;
}
