"use client";








import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";








import { Download, FileAudio ,VideoIcon} from "lucide-react";
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
    const [video, setVideo] = useState<string[]>([]);








    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            link: "",
        }
    });








    const isLoading = form.formState.isSubmitting;








    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setVideo([]);








            const response = await axios.post('/api/video/videocaption', values);








            setVideo(response.data);
            form.reset();
        } catch (error: any) {


        } finally {
            router.refresh();
        }
    }








    return (
        <div>
            <Heading
                title="Video Caption"
                description="Caption the videos with ease."
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




                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-2 mt-8">
                    {video.map((src) => (
                        <Card key={src} className="rounded-lg overflow-hidden">
                            <div className="relative aspect-square">
                                <video controls className="w-50 aspect-video">
                                    <source src={src} type="video/mp4" />


                                </video>
                            </div>
                            <CardFooter className="p-2">
                                <Button onClick={() => window.open(src)} variant="secondary" className="w-full">
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>






            </div>
        </div>
    );
}


export default VideoPage;
