import { Button, Card, Text } from "@mantine/core";
import { Deck } from "@/types/deck-type";
import { Link } from "react-router-dom";

type Props = {
  deck: Deck;
};

function DeckCard(props: Props) {
  return (
    <Card shadow="sm" radius="md" withBorder>
      <Text fw="bold" truncate>
        {props.deck.name}
      </Text>
      <Button
        component={Link}
        w="100%"
        mt="1.5rem"
        color="primary"
        to={`deck/${props.deck.id}`}
      >
        Study now
      </Button>
    </Card>
  );
}

export default DeckCard;
