import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProfileApi,
  loginApi,
  logoutApi,
} from "@/services/api/auth/auth.service";
import { QueriesKeyEnum } from "@/lib/queries-key/queries-key";

export const useLogin = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: [QueriesKeyEnum.get_profile] }),
  });
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: [QueriesKeyEnum.get_profile],
    queryFn: getProfileApi,
    enabled: !!localStorage.getItem("accessToken"),
    retry: false,
  });
};

export const useLogout = () => {
  return useMutation({ mutationFn: logoutApi });
};
