import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { useMutation } from "react-query";
import useDecksStore from "@/stores/decks-store";

type Props = {
  deckId: string;
};

function DeleteDeckButton(props: Props) {
  const deleteDeck = useDecksStore((state) => state.deleteDeck);

  const mutation = useMutation({
    mutationFn: () => {
      return axios.delete(
        import.meta.env.VITE_API_URL + `decks/${props.deckId}`,
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      deleteDeck(props.deckId);
    },
  });

  const onClick = () => {
    mutation.mutate();
  };

  return (
    <ActionIcon onClick={onClick} color="neutral.9">
      <IconTrash size="20" strokeWidth={1.5} />
    </ActionIcon>
  );
}

export default DeleteDeckButton;
