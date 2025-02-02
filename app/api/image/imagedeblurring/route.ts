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
    const { image, model } = body; 


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
      "google-research/maxim:cd3ebeefb3933d8ed4f75cc2457da8723bfcc69db8b9eb8651e855ca1c562e56",
      {
        input: {
          image: image ,
          model: "Image Deblurring"
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
