import { create } from "zustand";

interface AuthModalState {
  isOpen: boolean;
  authState: "login" | "register" | "forgotPassword";
  setIsOpen: (isOpen: boolean) => void;
  setAuthState: (authState: "login" | "register" | "forgotPassword") => void;
}

const useAuthModalStore = create<AuthModalState>((set) => ({
  isOpen: false,
  authState: "login",
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
  setAuthState: (authState: "login" | "register" | "forgotPassword") =>
    set({ authState }),
}));

export default useAuthModalStore;
