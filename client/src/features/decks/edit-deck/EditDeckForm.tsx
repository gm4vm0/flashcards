import useDecksStore from "@/stores/decks-store";
import { Deck } from "@/types/deck-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Center, TextInput } from "@mantine/core";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";

const inputsSchema = z.object({
  name: z
    .string()
    .trim()
    .max(50, "Content must be under 50 characters.")
    .optional(),
});
type Inputs = z.infer<typeof inputsSchema>;

type Props = {
  deck: Deck;
  onSubmit: () => void;
};

function EditDeckForm(props: Props) {
  const updateDeck = useDecksStore((state) => state.updateDeck);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(inputsSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: Inputs) => {
      if (!data.name) data.name = undefined;

      return axios.patch(
        import.meta.env.VITE_API_URL + `decks/${props.deck.id}`,
        data,
        { withCredentials: true }
      );
    },
  });

  const onSubmit = (data: Inputs) => {
    mutation.mutate(data, {
      onSuccess: (data) => {
        updateDeck(props.deck.id, data.data);
      },
    });
    props.onSubmit();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        {...register("name")}
        label="Deck name"
        error={errors.name?.message}
        placeholder={props.deck.name}
        mt="1rem"
      />
      <Center mt="2rem">
        <Button type="submit" variant="light" w="100%">
          Edit Deck
        </Button>
      </Center>
    </Box>
  );
}

export default EditDeckForm;
