import { create } from "zustand";

interface AuthModalState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const useAuthModalStore = create<AuthModalState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
}));

export default useAuthModalStore;
