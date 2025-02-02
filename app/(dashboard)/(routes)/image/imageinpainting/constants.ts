import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required."
  }),
  image: z.string().url({
    message: "Invalid URL format"
  }),


});
