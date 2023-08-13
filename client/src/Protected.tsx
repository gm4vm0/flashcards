import axios from "axios";
import { useQuery } from "react-query";

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

  return (
    <div>
      <p>{!isLoading && data}</p>
    </div>
  );
}

export default Protected;
