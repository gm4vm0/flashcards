import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Center, TextInput } from "@mantine/core";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";
import useCardsStore from "@/stores/cards-store";
import useDecksStore from "@/stores/decks-store";

const inputsSchema = z.object({
  front: z
    .string()
    .trim()
    .min(1, "Content is required.")
    .max(30, "Content must be under 30 characters."),
  back: z
    .string()
    .trim()
    .min(1, "Content is required.")
    .max(30, "Content must be under 30 characters."),
});
type Inputs = z.infer<typeof inputsSchema>;

type Props = {
  onSubmit: () => void;
};

function AddFlashCardForm(props: Props) {
  const currentDeck = useDecksStore((state) => state.currentDeck);
  const addCard = useCardsStore((state) => state.addCard);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(inputsSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: Inputs) => {
      return axios.post(
        import.meta.env.VITE_API_URL + `cards/${currentDeck?.id}`,
        data,
        { withCredentials: true }
      );
    },
  });

  const onSubmit = (data: Inputs) => {
    mutation.mutate(data, {
      onSuccess: (data) => {
        addCard(data.data);
      },
    });
    props.onSubmit();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        {...register("front")}
        label="Front"
        error={errors.front?.message}
      />
      <TextInput
        {...register("back")}
        label="Back"
        error={errors.back?.message}
        mt="1rem"
      />
      <Center mt="2rem">
        <Button type="submit" color="primary" w="100%">
          Add card
        </Button>
      </Center>
    </Box>
  );
}

export default AddFlashCardForm;
