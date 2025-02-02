import Replicate from 'replicate'
import dotenv from 'dotenv'
dotenv.config()

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
  userAgent: 'https://www.npmjs.com/package/create-replicate'
})
const model = 'logerzhu/ad-inpaint:b1c17d148455c1fda435ababe9ab1e03bc0d917cc3cf4251916f22c45c83c7df'
const input = {
  pixel: '512 * 512',
  scale: 3,
  prompt: 'modern sofa+ in a contemporary living room, filled with stylish decor+;modern, contemporary, sofa, living room, stylish decor',
  image_num: 4,
  image_path: 'https://replicate.delivery/pbxt/JAIk0rFAOUG00uetuiLOHPz42lBcf7QfX3xWi7TVaxMXXD4n/sofa1.png',
  manual_seed: -1,
  product_size: '0.5 * width',
  guidance_scale: 7.5,
  negative_prompt: 'illustration, 3d, sepia, painting, cartoons, sketch, (worst quality:2)',
  num_inference_steps: 20,
}

console.log({ model, input })
console.log('Running...')
const output = await replicate.run(model, { input })
console.log('Done!', output)
