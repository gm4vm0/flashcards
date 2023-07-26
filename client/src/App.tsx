import { Center, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "react-query";
import FlashcardsCarousel from "@/features/flashcards/FlashcardsCarousel";
import MainLayout from "./layout/MainLayout";
import AddFlashcardModal from "@/features/flashcards/add-flashcard/AddFlashcardModal";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <MainLayout>
          <Center
            w="100%"
            h="100%"
            sx={{ flexDirection: "column", padding: 0 }}
          >
            <FlashcardsCarousel />
            <AddFlashcardModal />
          </Center>
        </MainLayout>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
