import { Button, Card, Flex, Text } from "@mantine/core";
import { Deck } from "@/types/deck-type";
import { Link } from "react-router-dom";
import EditDeckModal from "./edit-deck/EditDeckModal";
import DeleteDeckButton from "./delete-deck/DeleteDeckButton";

type Props = {
  deck: Deck;
};

function DeckCard(props: Props) {
  return (
    <Card shadow="sm" radius="md" withBorder>
      <Flex justify="space-between" align="center">
        <Text fw="bold" truncate>
          {props.deck.name}
        </Text>
        <Flex>
          <EditDeckModal deck={props.deck} />
          <DeleteDeckButton deckId={props.deck.id} />
        </Flex>
      </Flex>
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
