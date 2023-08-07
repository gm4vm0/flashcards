import { Center } from "@mantine/core";
import FlashcardsCarousel from "@/features/flashcards/FlashcardsCarousel";
import AddFlashcardModal from "@/features/flashcards/add-flashcard/AddFlashcardModal";

function Index() {
  return (
    <Center w="100%" h="100%" sx={{ flexDirection: "column", padding: 0 }}>
      <FlashcardsCarousel />
      <AddFlashcardModal />
    </Center>
  );
}

export default Index;
