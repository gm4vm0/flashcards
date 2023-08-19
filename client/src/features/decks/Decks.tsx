import { Flex, Grid, Text } from "@mantine/core";
import axios from "axios";
import { useQuery } from "react-query";
import useDecksStore from "@/stores/decks-store";
import { Deck } from "@/types/deck-type";
import DeckCard from "./DeckCard";

function Decks() {
  const [decks, setDecks] = useDecksStore((state) => [
    state.decks,
    state.setDecks,
  ]);

  useQuery({
    queryKey: ["decks"],
    queryFn: async () => {
      const response = await axios.get(import.meta.env.VITE_API_URL + "decks", {
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: (data) => {
      setDecks(data);
    },
  });

  return (
    <Flex w="100%" mt="3rem">
      {decks.length === 0 ? (
        <Flex w="100%" justify="start">
          <Text>No decks created yet... create one now!</Text>
        </Flex>
      ) : (
        <Flex w="100%" direction="column">
          <Text fz="lg" ta="start">
            Here are your card decks:
          </Text>
          <Grid gutter="xl" mt="1rem">
            {decks.map((deck: Deck) => (
              <Grid.Col key={deck.id} sm={6} lg={4}>
                <DeckCard deck={deck} />
              </Grid.Col>
            ))}
          </Grid>
        </Flex>
      )}
    </Flex>
  );
}

export default Decks;
