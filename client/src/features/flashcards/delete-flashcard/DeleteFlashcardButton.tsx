import useCardsStore from "@/stores/cards-store";
import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { useMutation } from "react-query";

type Props = {
  cardId: string;
};

function DeleteFlashcardButton(props: Props) {
  const deleteCard = useCardsStore((state) => state.deleteCard);

  const mutation = useMutation({
    mutationFn: () => {
      return axios.delete(
        import.meta.env.VITE_API_URL + `cards/${props.cardId}`,
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      deleteCard(props.cardId);
    },
  });

  const onClick = () => {
    mutation.mutate();
  };

  return (
    <ActionIcon onClick={onClick} color="neutral.9">
      <IconTrash strokeWidth={1.5} />
    </ActionIcon>
  );
}

export default DeleteFlashcardButton;
