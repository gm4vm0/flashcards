import axios from "axios";
import { useQuery } from "react-query";
import { Deck } from "@/types/deck-type";
import { Grid } from "@mantine/core";
import useDecksStore from "@/stores/decks-store";

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
    <Grid w="100%">
      {decks.length === 0 ? (
        <p>No decks yet</p>
      ) : (
        decks.map((deck: Deck) => (
          <Grid.Col key={deck.id} span={4}>
            {deck.name}
          </Grid.Col>
        ))
      )}
    </Grid>
  );
}

export default Decks;
