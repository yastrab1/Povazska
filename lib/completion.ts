import { openai } from '@ai-sdk/openai';
import { FilePart, generateObject, ImagePart, TextPart } from 'ai';
import { z } from 'zod';


const model = openai('gpt-4o-mini');

export async function getResponse(data: string[]) {
  const prompt: (TextPart | ImagePart | FilePart)[] = [{ type: 'text', text: 'These images are a report of a problem in town summarize them in title of the problem (10 words max) and description of the problem (around 50 words max) and add tags, answer in slovak.' }];
  const imagePrompt: ImagePart[] = data.map((value) => { return { type: 'image', image: new URL(value) }});
  prompt.push(...imagePrompt);

  const { object } = await generateObject({
    model: model,
    schema: z.object({
      title: z.string(),
      description: z.string(),
      tags: z.array(z.enum(["doprava", "zdravie", "neporiadok", "odvoz_odpadu"])),
    }),

    messages: [
      {
        role: 'user',
        content: prompt
      },
    ],
  });

  return object;
}