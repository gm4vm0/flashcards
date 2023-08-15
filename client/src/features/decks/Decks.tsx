import { Flex, Grid, Text } from "@mantine/core";
import axios from "axios";
import { useQuery } from "react-query";
import useDecksStore from "@/stores/decks-store";
import { Deck } from "@/types/deck-type";

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
    <Flex w="100%" direction="column" align="start">
      {decks.length === 0 ? (
        <p>No decks created yet... create one now!</p>
      ) : (
        <div>
          <Text fz="lg" ta="start">
            Here are your card decks:
          </Text>
          <Grid w="100%" m="0">
            {decks.map((deck: Deck) => (
              <Grid.Col key={deck.id} span={4}>
                {deck.name}
              </Grid.Col>
            ))}
          </Grid>
        </div>
      )}
    </Flex>
  );
}

export default Decks;
