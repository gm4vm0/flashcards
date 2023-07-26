import { Carousel } from "@mantine/carousel";
import Flashcard from "./Flashcard";
import { useQuery } from "react-query";
import axios from "axios";
import useCardsStore from "@/stores/cards-store";

function FlashcardsCarousel() {
  const [cards, setCards] = useCardsStore((state) => [
    state.cards,
    state.setCards,
  ]);

  const { isLoading } = useQuery({
    queryKey: ["cards"],
    queryFn: async () => {
      const response = await axios.get(import.meta.env.VITE_API_URL + "cards");
      setCards(response.data);
      return response.data;
    },
  });

  return (
    <Carousel
      w="100%"
      slideSize="70%"
      slideGap="sm"
      controlsOffset="xl"
      controlSize={40}
      withIndicators
      styles={{
        indicator: {
          position: "relative",
          bottom: "1.5rem",
          backgroundColor: "gray",
        },
      }}
    >
      {!isLoading &&
        cards.map((card: any) => (
          <Carousel.Slide key={card.id}>
            <Flashcard card={card} />
          </Carousel.Slide>
        ))}
    </Carousel>
  );
}

export default FlashcardsCarousel;
