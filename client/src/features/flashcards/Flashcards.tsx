import useCardsStore from "@/stores/cards-store";
import { useQuery } from "react-query";
import axios from "axios";
import { Box, Center, Flex, Group, Paper, Text } from "@mantine/core";
import EditFlashcardModal from "./edit-flashcard/EditFlashcardModal";
import DeleteFlashcardButton from "./delete-flashcard/DeleteFlashcardButton";
import { useEffect, useState } from "react";
import FlashcardControls from "./FlashcardControls";

function Flashcards() {
  const [isFlipped, setIsFlipped] = useState(false);

  const [cards, setCards, currentCardIndex, setNextCard, setPrevCard] =
    useCardsStore((state) => [
      state.cards,
      state.setCards,
      state.currentCardIndex,
      state.setNextCard,
      state.setPrevCard,
    ]);
  const currentCard = cards[currentCardIndex];

  // flip card to front when card changed
  useEffect(() => setIsFlipped(false), [currentCardIndex]);

  useQuery({
    queryKey: ["cards"],
    queryFn: async () => {
      const response = await axios.get(import.meta.env.VITE_API_URL + "cards");
      setCards(response.data);
      return response.data;
    },
  });

  useEffect(() => {
    const keydownListener = (event: KeyboardEvent) => {
      switch (event.key) {
        case " ": {
          setIsFlipped(!isFlipped);
          break;
        }
        case "ArrowRight": {
          setNextCard();
          break;
        }
        case "ArrowLeft": {
          setPrevCard();
          break;
        }
      }
    };

    document.addEventListener("keydown", keydownListener);

    return () => {
      document.removeEventListener("keydown", keydownListener);
    };
  }, []);

  return (
    <Center w="100%" h="75%">
      {currentCard && (
        <Flex direction="column" w="100%" h="100%" align="center" rowGap="lg">
          <Paper
            onClick={() => setIsFlipped(!isFlipped)}
            shadow="sm"
            radius="lg"
            m="xl"
            p="xl"
            w="75%"
            h="100%"
            withBorder
            sx={{ cursor: "pointer" }}
          >
            <Group>
              <EditFlashcardModal card={currentCard} />
              <Box sx={{ marginLeft: "auto" }}>
                <DeleteFlashcardButton cardId={currentCard.id} />
              </Box>
            </Group>
            <Center h="100%" p="sm">
              <Text fz="lg" sx={{ userSelect: "none" }}>
                {isFlipped ? currentCard.back : currentCard.front}
              </Text>
            </Center>
          </Paper>
          <FlashcardControls />
        </Flex>
      )}
    </Center>
  );
}

export default Flashcards;