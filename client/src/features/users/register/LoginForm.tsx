import useAuthStore from "@/stores/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Center, TextInput } from "@mantine/core";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const inputsSchema = z.object({
  email: z.string(),
  password: z.string(),
});
type Inputs = z.infer<typeof inputsSchema>;

function LoginForm() {
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(inputsSchema),
  });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: Inputs) => {
      return axios.post(import.meta.env.VITE_API_URL + "auth/login", data, {
        withCredentials: true,
      });
    },
  });

  const onSubmit = (data: Inputs) => {
    mutation.mutate(data, {
      onSuccess: () => {
        setIsLoggedIn(true);
        navigate("/");
      },
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        {...register("email")}
        label="Email"
        error={errors.email?.message}
        withAsterisk
        mt="1rem"
      />
      <TextInput
        {...register("password")}
        label="Password"
        error={errors.password?.message}
        type="password"
        withAsterisk
        mt="1rem"
      />
      <Center mt="2rem">
        <Button type="submit" variant="light" w="100%">
          Login
        </Button>
      </Center>
    </Box>
  );
}

export default LoginForm;
