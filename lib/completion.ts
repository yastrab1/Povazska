import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { Schema, z } from 'zod';

const model = openai('gpt-4o-2024-08-06');
const default_schema = z.object({
    number: z.string()
});

export async function getResponse(data: string, schema: Schema = default_schema) {
    const { object } = await generateObject({
        model: model,
        schema: schema,
        messages: [
                {
                    role: 'user',
                    content: [
                        { type: 'text', text: 'Describe the following image' },
                        // { type: 'image', image: data }
                    ],
                },
            ],
    });

    console.log(object)
    return object;
}