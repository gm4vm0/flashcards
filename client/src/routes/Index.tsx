import { Center, Flex, MediaQuery, Text } from "@mantine/core";
import Decks from "@/features/decks/Decks";
import LoginPrompt from "@/layout/LoginPrompt";
import useAuthStore from "@/stores/auth-store";

function Index() {
  const user = useAuthStore((state) => state.user);

  return (
    <MediaQuery largerThan="lg" styles={{ padding: "3rem 8rem" }}>
      {user ? (
        <Center w="100%" h="100%" p="3rem" sx={{ flexDirection: "column" }}>
          <Flex w="100%" direction="column" align="start">
            <Text fz="xl" fw="bold" ta="start">
              Welcome, {user.firstName}
            </Text>
            <Text fz="lg" ta="start">
              Here are your card decks:
            </Text>
          </Flex>
          <Decks />
        </Center>
      ) : (
        <LoginPrompt />
      )}
    </MediaQuery>
  );
}

export default Index;
