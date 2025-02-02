import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import Replicate from "replicate";




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
      return new NextResponse("Prompt is required", { status: 400 });
    }




    const response = await replicate.run(
      "meta/musicgen:7a76a8258b23fae65c5a22debb8841d1d7e816b75c2f24218cd2bd8573787906",
      {
        input: {
          model_version: "melody",
          prompt: prompt,
          input_audio: link,
          //continuation: "True",
          duration: 20
        }
      }
    );
    return NextResponse.json(response);




  }




  catch (error) {
    console.log('[MUSIC_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
