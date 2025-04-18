import { API } from "@/lib/axios";

export interface GetMonthOrdersAmountResponse {
  amount: number;
  diffFromLastMonth: number;
}

export async function getMonthOrdersAmount() {
  const response = await API.get<GetMonthOrdersAmountResponse>(
    "/metrics/month-orders-amount",
  );

  return response.data;
}
