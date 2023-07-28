import axios from "axios";
import { useQuery } from "react-query";
import useAuthStore from "./stores/auth-store";

function Protected() {
  const { isLoading, data } = useQuery({
    queryKey: ["protected"],
    queryFn: async () => {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "auth/protected",
        { withCredentials: true }
      );
      return response.data;
    },
  });

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <div>
      <p>logged in state: {isLoggedIn ? "true" : "false"} </p>
      <p>{!isLoading && data}</p>
    </div>
  );
}

export default Protected;
