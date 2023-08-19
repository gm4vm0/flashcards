import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Center, TextInput } from "@mantine/core";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";
import useDecksStore from "@/stores/decks-store";

const inputsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Content is required.")
    .max(50, "Content must be under 30 characters."),
});
type Inputs = z.infer<typeof inputsSchema>;

type Props = {
  onSubmit: () => void;
};

function AddDeckForm(props: Props) {
  const addDeck = useDecksStore((state) => state.addDeck);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(inputsSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: Inputs) => {
      return axios.post(import.meta.env.VITE_API_URL + `decks`, data, {
        withCredentials: true,
      });
    },
  });

  const onSubmit = (data: Inputs) => {
    mutation.mutate(data, {
      onSuccess: (data) => {
        addDeck(data.data);
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
      />
      <Center mt="2rem">
        <Button type="submit" color="primary" w="100%">
          Add Deck
        </Button>
      </Center>
    </Box>
  );
}

export default AddDeckForm;
