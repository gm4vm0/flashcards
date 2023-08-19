import LoginForm from "@/features/users/register/LoginForm";
import { Flex, Text } from "@mantine/core";

function Login() {
  return (
    <Flex px="6rem" py="4rem" direction="column">
      <Text fz="3rem" fw="bold" mb="2rem">
        Login
      </Text>
      <LoginForm />
    </Flex>
  );
}

export default Login;
