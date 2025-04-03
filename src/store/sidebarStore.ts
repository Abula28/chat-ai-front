import { create } from "zustand";

interface SidebarState {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const useSidebarStore = create<SidebarState>((set) => ({
  open: true,
  setOpen: (value: boolean) => set({ open: value }),
}));

export default useSidebarStore;
