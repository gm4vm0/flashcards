import { Center, Flex, MediaQuery, Text } from "@mantine/core";
import Flashcards from "@/features/flashcards/Flashcards";
import AddFlashcardModal from "@/features/flashcards/add-flashcard/AddFlashcardModal";
import LoginPrompt from "@/layout/LoginPrompt";
import useAuthStore from "@/stores/auth-store";

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
        <LoginPrompt />
      )}
    </MediaQuery>
  );
}

export default Index;
