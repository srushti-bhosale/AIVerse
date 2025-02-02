"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FileAudio } from "lucide-react";
import { useRouter } from "next/navigation";


import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/ui/empty";

import { MessageSquare } from "lucide-react";




import { formSchema } from "./constants";


const ImgConvPage = () => {
    const router = useRouter();
    const [imgconvo, setimgconvo] = useState<string>();



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            image: "",
            prompt: ""
        }
    });


    const isLoading = form.formState.isSubmitting;


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setimgconvo(undefined);


            const response = await axios.post('/api/conversation/convo-image', values);


            setimgconvo(response.data);
            form.reset();
        } catch (error: any) {


        } finally {
            router.refresh();
        }
    }


    return (
        <div>
            <Heading
                title="Conversation using Image"
                description=" Know more about the image using the prompt."
                icon={MessageSquare}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10"
            />
            <div className="px-4 lg:px-8">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="
              rounded-lg
              border
              w-full
              p-4
              px-3
              md:px-6
              focus-within:shadow-sm
              grid
              grid-cols-12
              gap-2
            "
                    >
                        <FormField
                            name="image"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input
                                            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                            disabled={isLoading}
                                            placeholder="Image URL" // Update with a placeholder
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />


                        <FormField
                            name="prompt"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input
                                            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                            disabled={isLoading}
                                            placeholder="What is the name of the movie in the poster?" // Update with a placeholder
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />




                        <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">
                            Generate
                        </Button>
                    </form>
                </Form>
                {isLoading && (
                    <div className="p-20">
                        <Loader />
                    </div>
                )}
                {!imgconvo && !isLoading && (
                    <Empty label="No video files generated." />
                )}






                <div className="mt-8 rounded-lg border bg-white p-4">
                    <p className="text-black">{imgconvo}</p>
                </div>


            </div>
        </div>
    );
}


export default ImgConvPage;