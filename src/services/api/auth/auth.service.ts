import api from "@/lib/api/api";
import type { AuthTokens, User } from "@/types/api";

export const loginApi = async (payload: {
  email: string;
  password: string;
}): Promise<AuthTokens> => {
  const res = await api.post<AuthTokens>("/auth/login", payload);
  return res.data;
};

export const getProfileApi = async (): Promise<User> => {
  const res = await api.get<User>("/auth/profile");
  return res.data;
};

export const logoutApi = async (): Promise<void> => {
  await api.delete("/auth/logout");
};
