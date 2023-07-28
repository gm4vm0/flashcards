import axios from "axios";
import { create } from "zustand";

type AuthState = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn: isLoggedIn }),
}));

async function getLoggedInState() {
  const response = await axios.get(
    import.meta.env.VITE_API_URL + "auth/logged-in",
    {
      withCredentials: true,
    }
  );
  return response.data;
}

getLoggedInState().then((isLoggedIn) => useAuthStore.setState({ isLoggedIn }));

export default useAuthStore;
