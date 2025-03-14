import { z } from "zod";
export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Enter more characters.",
  }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email({ message: "Please enter a valid email." }),
  message: z.string().min(4, { message: "Enter more characters." }),
});

export type FormValues = z.infer<typeof formSchema>;
