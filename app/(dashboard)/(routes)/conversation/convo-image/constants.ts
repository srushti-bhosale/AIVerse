import * as z from "zod";








export const formSchema = z.object({


  image: z.string().url({
    message: "Invalid URL format"
  }),


  prompt: z.string().min(1, {
    message: "Prompt is required."
  }),
});
