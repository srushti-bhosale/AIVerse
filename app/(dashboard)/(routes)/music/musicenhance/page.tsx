"use client";








import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { Download, FileAudio, Music } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";








import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/ui/empty";
import { Loader } from "@/components/loader";
import { Card, CardFooter } from "@/components/ui/card";

const MusicPage = () => {
    const router = useRouter();
    const [music, setMusic] = useState<string[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            link: ""
        }
    });

   const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {

            setMusic([]);

            const response = await axios.post("/api/music/musicenhance", values);
            setMusic(response.data);

            form.reset();

        } catch (error: any) {
            console.log(error);
        } finally {
            router.refresh();
        }
    };

    return (
        <div>
            <Heading
                title="Audio enhancement"
                description="Denoise and enhance your audio files."
                icon={FileAudio}
                iconColor="text-emerald-500"
                bgColor="bg-emerald-500/10"
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
                            name="link"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input
                                            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                            disabled={isLoading}
                                            placeholder="Audio URL" // Update with a placeholder
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
                {!music && !isLoading && (
                    <Empty label="No video files generated." />
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 gap-4 mt-8">
                    {music.map((src) => (


                        <audio controls className="w-full aspect-video">
                            <source src={src} type="audio/mp3" />


                        </audio>



                    ))}
                </div>


            </div>
        </div>
    );
}

export default MusicPage;
