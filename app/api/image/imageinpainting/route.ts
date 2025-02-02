import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import Replicate from "replicate";
import { checkSubscription } from "@/lib/subscription";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";


const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});


export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, image  } = body;


    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }


    if (!image) { // Check if image is provided
      return new NextResponse("Image is required", { status: 400 });
    }


    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();


    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
    }


    const response = await replicate.run(
      "logerzhu/ad-inpaint:b1c17d148455c1fda435ababe9ab1e03bc0d917cc3cf4251916f22c45c83c7df",
      {
        input: {
          pixel: "512 * 512",
          scale: 3,
          prompt: prompt,
          image_num: 4,
          image_path: image,
          manual_seed: -1,
          product_size: "0.5 * width",
          guidance_scale: 7.5,
          negative_prompt: "illustration, 3d, sepia, painting, cartoons, sketch, (worst quality:2)",
          num_inference_steps: 20
        }
      }
    );


    if (!isPro) {
      await incrementApiLimit();
    }


    return NextResponse.json(response);
  }
  catch (error) {
    console.log('[IMAGE_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};


