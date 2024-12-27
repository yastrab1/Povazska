import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { Schema, z } from 'zod';

const model = openai('gpt-4o-2024-08-06');
const default_schema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.enum(["doprava","zdravie","neporiadok","odvod_odpadu"])),
});

export async function getResponse(data: string, schema: Schema = default_schema) {
  const { object } = await generateObject({
    model: model,
    schema: schema,
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: 'This image is a report of a problem in town summarize it in title of the problem (around 10 words max) and description of the problem (around 50 words max) and add tags, answer in slovak' },
          { type: 'image', image: data }
        ],
      },
    ],
  });

  return object;
}