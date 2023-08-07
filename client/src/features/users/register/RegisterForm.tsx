import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Center, TextInput } from "@mantine/core";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const inputsSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters.")
      .max(50, "First name must be under 50 characters."),
    lastName: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters.")
      .max(50, "First name must be under 50 characters."),
    email: z.string().trim().email("Email must be a valid email address."),
    password: z
      .string()
      .trim()
      .min(2, "Password must be at least 2 characters.")
      .max(50, "Password must be under 50 characters."),
    confirmPassword: z
      .string()
      .trim()
      .min(2, "Password must be at least 2 characters.")
      .max(50, "Password must be under 50 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords needs to match.",
    path: ["confirmPassword"],
  });
type Inputs = z.infer<typeof inputsSchema>;

function RegisterForm() {
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
      Reflect.deleteProperty(data, "confirmPassword");
      return axios.post(import.meta.env.VITE_API_URL + "auth/register", data);
    },
  });

  const onSubmit = (data: Inputs) => {
    mutation.mutate(data);
    navigate("/login");
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        {...register("firstName")}
        label="First name"
        error={errors.firstName?.message}
        withAsterisk
      />
      <TextInput
        {...register("lastName")}
        label="Last name"
        error={errors.lastName?.message}
        withAsterisk
        mt="1rem"
      />
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
      <TextInput
        {...register("confirmPassword")}
        label="Password confirmation"
        error={errors.confirmPassword?.message}
        type="password"
        withAsterisk
        mt="1rem"
      />
      <Center mt="2rem">
        <Button type="submit" variant="light" w="100%">
          Register
        </Button>
      </Center>
    </Box>
  );
}

export default RegisterForm;
