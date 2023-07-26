import { Box, Center, Group, Paper, Text } from "@mantine/core";
import { useState } from "react";
import { Card } from "@/types/card-type";
import EditFlashcardModal from "./edit-flashcard/EditFlashcardModal";
import DeleteFlashcardButton from "./delete-flashcard/DeleteFlashcardButton";

type Props = {
  card: Card;
};

function Flashcard(props: Props) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <Paper
      onClick={() => setIsFlipped(!isFlipped)}
      shadow="sm"
      radius="lg"
      m="sm"
      p="xl"
      h="70vh"
      withBorder
      sx={{ cursor: "pointer" }}
    >
      <Group>
        <EditFlashcardModal card={props.card} />
        <Box sx={{ marginLeft: "auto" }}>
          <DeleteFlashcardButton cardId={props.card.id} />
        </Box>
      </Group>
      <Center h="100%" p="sm">
        <Text sx={{ userSelect: "none" }}>
          {isFlipped ? props.card.back : props.card.front}
        </Text>
      </Center>
    </Paper>
  );
}

export default Flashcard;
