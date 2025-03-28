import { API } from "@/lib/axios";

export function signOut() {
  return API.post("/sign-out");
}
