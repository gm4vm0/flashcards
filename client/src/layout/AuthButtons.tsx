import useAuthStore from "@/stores/auth-store";
import { Button, Flex, Text } from "@mantine/core";
import axios from "axios";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";

function AuthButtons() {
  const [user, setUser] = useAuthStore((state) => [state.user, state.setUser]);

  const mutation = useMutation({
    mutationFn: async () => {
      return await axios.delete(import.meta.env.VITE_API_URL + "auth/logout", {
        withCredentials: true,
      });
    },
  });

  const onLogout = () => {
    mutation.mutate();
    setUser(null);
  };

  return (
    <Flex ml="auto">
      {user ? (
        <Button
          variant="subtle"
          styles={{
            root: {
              "&:hover": { background: "none" },
            },
          }}
          onClick={onLogout}
        >
          <Text>Logout</Text>
        </Button>
      ) : (
        <div>
          <Button
            variant="subtle"
            styles={{
              root: {
                "&:hover": { background: "none" },
              },
            }}
          >
            <Text component={Link} to="/register">
              Register
            </Text>
          </Button>
          <Button
            variant="outline"
            styles={{
              root: {
                borderRadius: "1rem",
              },
            }}
          >
            <Text component={Link} to="/login">
              Login
            </Text>
          </Button>
        </div>
      )}
    </Flex>
  );
}

export default AuthButtons;
