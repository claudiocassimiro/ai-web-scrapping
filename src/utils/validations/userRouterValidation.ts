import z from "zod";

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password is too short, must be larger than 8 digits"),
});

export const updateUserSchema = z.object({
  password: z
    .string()
    .min(8, "Password is too short, must be larger than 8 digits"),
});

export type createUserType = z.infer<typeof createUserSchema>;
export type updateUserType = z.infer<typeof updateUserSchema>;

export const createUserValidation = (userData: createUserType) => {
  const { success } = createUserSchema.safeParse(userData);

  return success;
};

export const updateUserSchemaValidation = (userData: updateUserType) => {
  const { success } = updateUserSchema.safeParse(userData);

  return success;
};
