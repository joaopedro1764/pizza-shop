import { API } from "@/lib/axios";

export interface SiginBody {
  email: string;
}

export async function signIn({ email }: SiginBody) {
  await API.post("/authenticate", { email });
}
