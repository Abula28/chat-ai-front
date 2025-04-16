import { create } from "zustand";
import { UserT } from "../backend/types";

interface UserStore {
  data: UserT | null;
  setData: (data: UserT | null) => void;
}

const useUserStore = create<UserStore>((set) => ({
  data: null,
  setData: (data: UserT | null) => set({ data }),
}));

export default useUserStore;
