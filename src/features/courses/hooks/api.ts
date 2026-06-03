import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCourseApi, deleteCourseApi, getCoursesApi, updateCourseApi } from "@/services/api/courses/courses.service";

export const courseKeys = {
  all: ["courses"] as const,
  list: () => [...courseKeys.all, "list"] as const,
};

export const useGetCourses = () => {
  return useQuery({ queryKey: courseKeys.list(), queryFn: getCoursesApi });
};

export const useCreateCourse = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: createCourseApi, onSuccess: () => qc.invalidateQueries({ queryKey: courseKeys.all }) });
};

export const useUpdateCourse = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: updateCourseApi, onSuccess: () => qc.invalidateQueries({ queryKey: courseKeys.all }) });
};

export const useDeleteCourse = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: deleteCourseApi, onSuccess: () => qc.invalidateQueries({ queryKey: courseKeys.all }) });
};
