import RegisterForm from "@/features/users/register/RegisterForm";
import { Flex, Text } from "@mantine/core";

function Register() {
  return (
    <Flex px="6rem" py="4rem" direction="column">
      <Text fz="3rem" fw="bold" mb="2rem">
        Register
      </Text>
      <RegisterForm />
    </Flex>
  );
}

export default Register;
