import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import Replicate from "replicate";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { link } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }


    // if (!prompt) {
    //   return new NextResponse("Prompt is required", { status: 400 });
    // }


    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();


    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
    }

    const response = await replicate.run(
      "grandlineai/resemble-enhance:f0e3f284d0b4d696bc8f93ba6c2e51f6272191aeddf10e224ea8b2b026e211ed",
  {
    input: {
      solver: "Midpoint",
      input_file: link,
      denoise_flag: false,
      prior_temperature: 0.5,
      number_function_evaluations: 64
    }
  }
);


   
    if (!isPro) {
      await incrementApiLimit();   }


    return NextResponse.json(response);


  }


  catch (error) {
    console.log('[MUSIC_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
