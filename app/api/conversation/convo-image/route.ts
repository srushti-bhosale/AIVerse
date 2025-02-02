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
    const { image, prompt } = body;








    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
    }

    if (!isPro) {
      await incrementApiLimit();
    }







    const response = await replicate.run(
        "lucataco/qwen-vl-chat:50881b153b4d5f72b3db697e2bbad23bb1277ab741c5b52d80cd6ee17ea660e9",
        {
          input: {
            image: image,
            prompt: prompt
          }
        }
      );
    return NextResponse.json(response);








  }








  catch (error) {
    console.log('[CONVERSATION_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
