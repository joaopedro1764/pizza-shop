import { API } from "@/lib/axios";

export type GetPopularProductsResponse = {
  product: string;
  amount: number;
}[];

export async function getPopularProducts() {
  const response = await API.get<GetPopularProductsResponse>(
    "/metrics/popular-products",
  );

  return response.data;
}
