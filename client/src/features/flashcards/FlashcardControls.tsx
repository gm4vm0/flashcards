import useCardsStore from "@/stores/cards-store";
import { ActionIcon, Group, useMantineTheme } from "@mantine/core";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

function FlashcardControls() {
  const black = useMantineTheme().black;

  const [setNextCard, setPrevCard] = useCardsStore((state) => [
    state.setNextCard,
    state.setPrevCard,
  ]);

  return (
    <Group spacing="8rem">
      <ActionIcon
        component="button"
        size="xl"
        radius="xl"
        variant="outline"
        onClick={setPrevCard}
      >
        <IconArrowLeft color={black} stroke={1.5} />
      </ActionIcon>
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
