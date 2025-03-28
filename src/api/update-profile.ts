import { API } from "@/lib/axios";

interface UpdateProfileBody {
  name: string;
  description: string | null;
}

export async function updateProfile({ name, description }: UpdateProfileBody) {
  return API.put("/profile", { name, description });
}
