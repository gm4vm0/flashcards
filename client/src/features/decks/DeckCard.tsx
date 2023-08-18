import { Button, Card, Text } from "@mantine/core";
import { Deck } from "@/types/deck-type";

type Props = {
  deck: Deck;
};

function DeckCard(props: Props) {
  return (
    <Card shadow="sm" radius="md" withBorder>
      <Text fw="bold" truncate>
        {props.deck.name}
      </Text>
      <Button w="100%" mt="1.5rem" color="primary">
        Study now
      </Button>
    </Card>
  );
}

export default DeckCard;
