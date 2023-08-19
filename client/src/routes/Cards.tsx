import { Center, MediaQuery } from "@mantine/core";
import Flashcards from "@/features/flashcards/Flashcards";

function Cards() {
  return (
    <MediaQuery largerThan="lg" styles={{ padding: "3rem 8rem" }}>
      <Center w="100%" h="100%" p="3rem" sx={{ flexDirection: "column" }}>
        <Flashcards />
      </Center>
    </MediaQuery>
  );
}

export default Cards;
