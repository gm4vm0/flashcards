import { Flex, Text } from "@mantine/core";
import { Link } from "react-router-dom";

function LoginPrompt() {
  return (
    <Flex h="100%" p="3rem" direction="column" justify="center" align="start">
      <Text fz="3rem" fw="bold">
        Welcome!
      </Text>
      <Text fz="lg">
        Please&nbsp;
        <Text component={Link} to="/register" td="underline" color="primary.5">
          register
        </Text>
        &nbsp;or&nbsp;
        <Text component={Link} to="/login" td="underline" color="primary.5">
          login
        </Text>
        &nbsp;to continue
      </Text>
    </Flex>
  );
}

export default LoginPrompt;
