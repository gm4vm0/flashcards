import { Center } from "@mantine/core";
import AddFlashcardModal from "@/features/flashcards/add-flashcard/AddFlashcardModal";
import Flashcards from "@/features/flashcards/Flashcards";

function Index() {
  return (
    <Center w="100%" h="100%" sx={{ flexDirection: "column", padding: 0 }}>
      <AddFlashcardModal />
      <Flashcards />
    </Center>
  );
}

export default Index;
