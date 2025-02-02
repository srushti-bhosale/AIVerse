"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


import { Download,ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";


import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/ui/empty";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";


import { formSchema } from "./constants";




const ImagePage = () => {
    const router = useRouter();
    const [images, setImages] = useState<string>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            image: "", 
        }
    });



    const isLoading = form.formState.isSubmitting;


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setImages(undefined);




            const response = await axios.post('/api/image/imagedeblurring', values);


            setImages(response.data);
            form.reset();
        } catch (error: any) {

        } finally {
            router.refresh();
        }
    }


    return (
        <div>
            <Heading
                title="Image Deblurring"
                description="Deblur your images with ease."
                icon={ImageIcon}
                iconColor="text-pink-700"
                bgColor="bg-pink-700/10"
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




                <div className="grid grid-cols-1 xl:grid-cols-3 mt-4">
                {images && ( // Check if images is truthy
                    <Card className="rounded-lg overflow-hidden">
                        <div className="relative aspect-square">
                            <Image
                                fill
                                alt="Generated"
                                src={images} // Render the single image URL directly
                             />
                        </div>
                        <CardFooter className="p-2">
                            <Button onClick={() => window.open(images)} variant="secondary" className="w-full">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                            </Button>
                        </CardFooter>
                    </Card>
                    )}
                </div>
            </div>
        </div>
    );
}


export default ImagePage;


