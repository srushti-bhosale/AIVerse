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
    const { prompt, link } = body;
















    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }


   
    if (!prompt) {
      return new NextResponse("transcription is required", { status: 400 });
    }








    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();




    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
    }




















    const response = await replicate.run(
      "jd7h/edit-video-by-editing-text:e010b880347314d07e3ce3b21cbd4c57add51fea3474677a6cb1316751c4cb90",
  {
    input: {
      mode: "edit",
      split_at: "word",
      video_in: link,
      transcription: prompt
    }
  }
);
    if (!isPro) {
      await incrementApiLimit();
    }


    return NextResponse.json(response);








  }






  catch (error) {
    console.log('[VIDEO_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};


