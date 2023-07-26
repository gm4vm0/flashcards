import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Center, TextInput } from "@mantine/core";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";
import useCardsStore from "@/stores/cards-store";

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
      return axios.post(import.meta.env.VITE_API_URL + "cards", data);
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
        label="Front content"
        error={errors.front?.message}
        withAsterisk
      />
      <TextInput
        {...register("back")}
        label="Back content"
        error={errors.back?.message}
        withAsterisk
        mt="1rem"
      />
      <Center mt="2rem">
        <Button type="submit" variant="light" w="100%">
          Add Card
        </Button>
      </Center>
    </Box>
  );
}

export default AddFlashCardForm;
