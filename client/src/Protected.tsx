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

  const user = useAuthStore((state) => state.user);

  return (
    <div>
      <p>logged in state: {user ? "true" : "false"} </p>
      <p>{!isLoading && data}</p>
    </div>
  );
}

export default Protected;
