import useCardsStore from "@/stores/cards-store";
import { ActionIcon, Group, Text, useMantineTheme } from "@mantine/core";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

function FlashcardControls() {
  const black = useMantineTheme().black;

  const [cards, currentCardIndex, setNextCard, setPrevCard] = useCardsStore(
    (state) => [
      state.cards,
      state.currentCardIndex,
      state.setNextCard,
      state.setPrevCard,
    ]
  );

  return (
    <Group>
      <ActionIcon
        component="button"
        size="xl"
        radius="xl"
        variant="outline"
        onClick={setPrevCard}
      >
        <IconArrowLeft color={black} stroke={1.5} />
      </ActionIcon>
      <Text w="5rem" color="gray.6" ta="center">
        {currentCardIndex + 1} / {cards.length}
      </Text>
      <ActionIcon
        component="button"
        size="xl"
        radius="xl"
        variant="outline"
        onClick={setNextCard}
      >
        <IconArrowRight color={black} stroke={1.5} />
      </ActionIcon>
    </Group>
  );
}

export default FlashcardControls;
