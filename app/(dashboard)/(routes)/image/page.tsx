"use client";


import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";




import { Download, ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";




import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/ui/empty";






import { formSchema } from "./constants";
import { Card, CardFooter } from "@/components/ui/card";




export default function ImagePage() {
    const router = useRouter();


    // Function to handle button click and redirect
    const handleButtonClick = (path: string) => {
        router.push(path); // Redirect to the specified path
    };


return (
    <div>
            <Heading
              title="Image Editing"
              description="Edit your images using AI."
              icon={ImageIcon}
              iconColor="text-pink-700"
              bgColor="bg-pink-700/10"
            />
    
    
            <div className="mb-4">
                <Button
                    className="col-span-15 lg:col-span-5 w-1/2 mx-auto flex justify-center"
                    type="submit"
                    size="icon"
                    onClick={() => handleButtonClick('/image/imagedeblurring')}
                >
                    Image Deblurring
                </Button>
                </div>
                <div className="mb-4">
                <Button
                    className="col-span-15 lg:col-span-5 w-1/2 mx-auto flex justify-center"
                    type="button"
                    size="icon"
                    onClick={() => handleButtonClick('/image/imageinpainting')}
                >
                    Image Inpainting
                </Button>
                </div>
    </div>
            
            
           
        );
    }







