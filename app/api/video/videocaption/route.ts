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
      "fictions-ai/autocaption:18a45ff0d95feb4449d192bbdc06b4a6df168fa33def76dfc51b78ae224b599b",
  {
    input: {
      font: "Poppins/Poppins-ExtraBold.ttf",
      color: "white",
      kerning: -5,
      opacity: 0,
      MaxChars: 20,
      fontsize: 7,
      translate: false,
      output_video: true,
      stroke_color: "black",
      stroke_width: 2.6,
      right_to_left: false,
      subs_position: "bottom75",
      highlight_color: "yellow",
      video_file_input: link,
      output_transcript: false
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
