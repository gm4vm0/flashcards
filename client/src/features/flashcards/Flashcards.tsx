import useCardsStore from "@/stores/cards-store";
import { Center, Flex, Group, Paper, Text } from "@mantine/core";
import EditFlashcardModal from "./edit-flashcard/EditFlashcardModal";
import DeleteFlashcardButton from "./delete-flashcard/DeleteFlashcardButton";
import { useEffect, useState } from "react";
import FlashcardControls from "./FlashcardControls";
import AddFlashcardModal from "./add-flashcard/AddFlashcardModal";
import useDecksStore from "@/stores/decks-store";

function Flashcards() {
  const [isFlipped, setIsFlipped] = useState(false);

  const currentDeck = useDecksStore((state) => state.currentDeck);
  const [cards, currentCardIndex, setNextCard, setPrevCard] = useCardsStore(
    (state) => [
      state.cards,
      state.currentCardIndex,
      state.setNextCard,
      state.setPrevCard,
    ]
  );
  const currentCard = cards[currentCardIndex];

  // flip card to front when card changed
  useEffect(() => {
    setIsFlipped(false);
  }, [currentCardIndex]);

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
  }, [isFlipped]);

  return (
    <Center w="100%" h="100%" sx={{ display: "flex", flexDirection: "column" }}>
      <Flex w="100%" justify="space-between" align="center">
        <Text fz="xl" fw="bold">
          {currentDeck?.name}
        </Text>
        <AddFlashcardModal />
      </Flex>
      {cards.length === 0 ? (
        <Flex direction="column" align="center">
          <Text fz="lg" fs="italic" mb="2rem">
            No cards created yet...
          </Text>
        </Flex>
      ) : (
        currentCard && (
          <Flex direction="column" w="100%" h="100%" align="center">
            <Paper
              onClick={() => {
                setIsFlipped(!isFlipped);
                console.log(isFlipped);
              }}
              shadow="sm"
              radius="lg"
              m="xl"
              p="xl"
              w="100%"
              h="100%"
              withBorder
              sx={{ cursor: "pointer" }}
            >
              <Group>
                <Flex w="100%" justify="space-between">
                  <EditFlashcardModal card={currentCard} />
                  <DeleteFlashcardButton cardId={currentCard.id} />
                </Flex>
              </Group>
              <Center h="100%" p="sm">
                <Text fz="lg" sx={{ userSelect: "none" }}>
                  {isFlipped ? currentCard.back : currentCard.front}
                </Text>
              </Center>
            </Paper>
            <FlashcardControls />
          </Flex>
        )
      )}
    </Center>
  );
}

export default Flashcards;
