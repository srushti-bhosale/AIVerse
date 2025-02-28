"use client";


import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";




import { Download, FileAudio,VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";




import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/ui/empty";






import { formSchema } from "./constants";
import { Card, CardFooter } from "@/components/ui/card";






const VideoPage = () => {
    const router = useRouter();
    const [video, setVideo] = useState<string>();
















    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {


            link: ""


        }
    });
















    const isLoading = form.formState.isSubmitting;
















    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setVideo(undefined);






            const response = await axios.post('/api/video/videoediting/videotranscribe', values);








            setVideo(response.data.transcription);
            form.reset();
        } catch (error: any) {




        } finally {
            router.refresh();
        }
    }



    return (
        <div>
            <Heading
                title="Video Transcription"
                description="Transcribe your video files to text."
                icon={VideoIcon}
                iconColor="text-orange-700"
                bgColor="bg-orange-700/10"
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
                                            placeholder="Video URL" // Update with a placeholder
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
                {!video && !isLoading && (
                    <Empty label="No video files generated." />
                )}








                <div className="mt-8 rounded-lg border bg-white p-4">
                    <p className="text-black">{video}</p>
                </div>










            </div>
        </div>
    );
}




export default VideoPage;
