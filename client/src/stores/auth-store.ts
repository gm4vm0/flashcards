import { User } from "@/types/user-type";
import axios from "axios";
import { create } from "zustand";

type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user: user }),
}));

async function getUser() {
  const response = await axios.get(import.meta.env.VITE_API_URL + "auth", {
    withCredentials: true,
  });
  return response.data;
}

getUser().then((user) => useAuthStore.setState({ user }));

export default useAuthStore;
