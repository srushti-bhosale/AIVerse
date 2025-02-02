import * as z from "zod";




export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required."
  }),
  link: z.string().url({
    message: "Invalid URL format"
  }),
  //continuation: z.boolean() // Add this line to validate 'continuation' as a boolean
});
