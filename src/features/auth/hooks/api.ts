import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfileApi, loginApi, logoutApi } from "@/services/api/auth/auth.service";

export const useLogin = () => {
  return useMutation({ mutationFn: loginApi });
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfileApi,
    enabled: !!localStorage.getItem("accessToken"),
    retry: false,
  });
};

export const useLogout = () => {
  return useMutation({ mutationFn: logoutApi });
};
