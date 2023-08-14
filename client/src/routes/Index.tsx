import { Center, Flex, MediaQuery, Text } from "@mantine/core";
import AddFlashcardModal from "@/features/flashcards/add-flashcard/AddFlashcardModal";
import Flashcards from "@/features/flashcards/Flashcards";
import useAuthStore from "@/stores/auth-store";
import { Link } from "react-router-dom";

function Index() {
  const user = useAuthStore((state) => state.user);

  return (
    <MediaQuery largerThan="lg" styles={{ padding: "3rem 8rem" }}>
      {user ? (
        <Center w="100%" h="100%" p="3rem" sx={{ flexDirection: "column" }}>
          <Flex w="100%" mb="lg" justify="space-between" align="center">
            <Text fz="xl" fw="bold">
              Welcome, {user.firstName}
            </Text>
            <AddFlashcardModal />
          </Flex>
          <Flashcards />
        </Center>
      ) : (
        <Flex
          h="100%"
          p="3rem"
          direction="column"
          justify="center"
          align="start"
        >
          <Text fz="3rem" fw="bold">
            Welcome!
          </Text>
          <Text fz="lg">
            Please&nbsp;
            <Text
              component={Link}
              to="/register"
              td="underline"
              color="primary.5"
            >
              register
            </Text>
            &nbsp;or&nbsp;
            <Text component={Link} to="/login" td="underline" color="primary.5">
              login
            </Text>
            &nbsp;to continue
          </Text>
        </Flex>
      )}
    </MediaQuery>
  );
}

export default Index;
