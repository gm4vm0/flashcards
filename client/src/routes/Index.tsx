import { Center } from "@mantine/core";
import AddFlashcardModal from "@/features/flashcards/add-flashcard/AddFlashcardModal";
import Flashcards from "@/features/flashcards/Flashcards";
import useAuthStore from "@/stores/auth-store";

function Index() {
  const user = useAuthStore((state) => state.user);

  if (!user) return <p>Log in first</p>;

  return (
    <Center w="100%" h="100%" sx={{ flexDirection: "column", padding: 0 }}>
      <AddFlashcardModal />
      <Flashcards />
    </Center>
  );
}

export default Index;
