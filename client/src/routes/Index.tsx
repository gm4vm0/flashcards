import { Center, Flex, Text } from "@mantine/core";
import AddFlashcardModal from "@/features/flashcards/add-flashcard/AddFlashcardModal";
import Flashcards from "@/features/flashcards/Flashcards";
import useAuthStore from "@/stores/auth-store";

function Index() {
  const user = useAuthStore((state) => state.user);

  if (!user) return <p>Log in first</p>;

  return (
    <Center
      w="100%"
      h="100%"
      px="8rem"
      py="3rem"
      sx={{ flexDirection: "column" }}
    >
      <Flex w="100%" mb="lg" justify="space-between" align="center">
        <Text fz="xl" fw="bold">
          Welcome, {user.firstName}
        </Text>
        <AddFlashcardModal />
      </Flex>
      <Flashcards />
    </Center>
  );
}

export default Index;
