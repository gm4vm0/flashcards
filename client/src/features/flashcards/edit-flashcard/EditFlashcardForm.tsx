import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Center, TextInput } from "@mantine/core";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";
import useCardsStore from "@/stores/cards-store";
import { Card } from "@/types/card-type";

const inputsSchema = z.object({
  front: z
    .string()
    .trim()
    .max(30, "Content must be under 30 characters.")
    .optional(),
  back: z
    .string()
    .trim()
    .max(30, "Content must be under 30 characters.")
    .optional(),
});
type Inputs = z.infer<typeof inputsSchema>;

type Props = {
  card: Card;
  onSubmit: () => void;
};

function EditFlashCardForm(props: Props) {
  const updateCard = useCardsStore((state) => state.updateCard);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(inputsSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: Inputs) => {
      if (!data.front) data.front = undefined;
      if (!data.back) data.back = undefined;

      return axios.patch(
        import.meta.env.VITE_API_URL + `cards/${props.card.id}`,
        data,
        { withCredentials: true }
      );
    },
  });

  const onSubmit = (data: Inputs) => {
    mutation.mutate(data, {
      onSuccess: (data) => {
        updateCard(props.card.id, data.data);
      },
    });
    props.onSubmit();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        {...register("front")}
        label="Front content"
        placeholder={props.card.front}
        error={errors.front?.message}
      />
      <TextInput
        {...register("back")}
        label="Back content"
        error={errors.back?.message}
        placeholder={props.card.back}
        mt="1rem"
      />
      <Center mt="2rem">
        <Button type="submit" variant="light" w="100%">
          Edit Card
        </Button>
      </Center>
    </Box>
  );
}

export default EditFlashCardForm;
