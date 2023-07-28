import useAuthStore from "@/stores/auth-store";
import { Button, Flex, Text } from "@mantine/core";
import axios from "axios";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";

function AuthButtons() {
  const [isLoggedIn, setIsLoggedIn] = useAuthStore((state) => [
    state.isLoggedIn,
    state.setIsLoggedIn,
  ]);

  const mutation = useMutation({
    mutationFn: async () => {
      return await axios.delete(import.meta.env.VITE_API_URL + "auth/logout", {
        withCredentials: true,
      });
    },
  });

  const onLogout = () => {
    mutation.mutate();
    setIsLoggedIn(false);
  };

  return (
    <Flex ml="auto">
      {isLoggedIn ? (
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
