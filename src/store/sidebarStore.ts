import { create } from "zustand";

interface LayoutState {
  open: boolean;
  selectedPrompt: string | undefined;
  setSelectedPrompt: (value: string) => void;
  setOpen: (value: boolean) => void;
}

const useLayoutStore = create<LayoutState>((set) => ({
  open: true,
  selectedPrompt: undefined,
  setSelectedPrompt: (value: string) => set({ selectedPrompt: value }),
  setOpen: (value: boolean) => set({ open: value }),
}));

export default useLayoutStore;
