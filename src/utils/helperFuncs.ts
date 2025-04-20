import useUserStore from "../store/userStore";

export const isAuth = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export const isAdmin = () => {
  const { data } = useUserStore();

  return data?.role === "admin";
};
