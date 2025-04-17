import { create } from "zustand";

interface AuthModalState {
  isOpen: boolean;
  isLogin: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setIsLogin: (isLogin: boolean) => void;
}

const useAuthModalStore = create<AuthModalState>((set) => ({
  isOpen: false,
  isLogin: true,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
  setIsLogin: (isLogin: boolean) => set({ isLogin }),
}));

export default useAuthModalStore;
