import { openai } from '@ai-sdk/openai';
import { FilePart, generateObject, ImagePart, TextPart } from 'ai';
import { Schema, z } from 'zod';
import {strict} from "node:assert";

const model = openai('gpt-4o-2024-08-06');
// const default_schema = ;

export async function getResponse(data: string[], schema: Schema = null) {
  const prompt: (TextPart | ImagePart | FilePart)[] = [{ type: 'text', text: 'These images are a report of a problem in town summarize them in title of the problem (10 words max) and description of the problem (around 50 words max) and add tags, answer in slovak. Do not use tags that are not provided in your schema!' }];
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