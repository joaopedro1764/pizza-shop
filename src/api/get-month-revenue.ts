import { API } from "@/lib/axios";

export interface GetMonthRevenueResponse {
  receipt: number;
  diffFromLastMonth: number;
}

export async function getMonthRevenue() {
  const response = await API.get<GetMonthRevenueResponse>(
    "/metrics/month-receipt",
  );

  return response.data;
}
