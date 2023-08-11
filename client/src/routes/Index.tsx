import { Center } from "@mantine/core";
import AddFlashcardModal from "@/features/flashcards/add-flashcard/AddFlashcardModal";
import Flashcards from "@/features/flashcards/Flashcards";
import FlashcardControls from "@/features/flashcards/FlashcardControls";

function Index() {
  return (
    <Center w="100%" h="100%" sx={{ flexDirection: "column", padding: 0 }}>
      <Flashcards />
      <FlashcardControls />
      <AddFlashcardModal />
    </Center>
  );
}

export default Index;
