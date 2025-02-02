import * as z from "zod";








export const formSchema = z.object({


  link: z.string().url({
    message: "Invalid URL format"
  }),




  prompt: z.string().min(1, {
    message: "Prompt is required."
  }),
});
