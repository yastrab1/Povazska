import {openai} from '@ai-sdk/openai';
import {FilePart, generateObject, ImagePart, TextPart} from 'ai';
import {z} from 'zod';
import {sort} from "next/dist/build/webpack/loaders/css-loader/src/utils";

function sortObjectByNumber(inputObject:Object) {
  // Convert the object to an array of key-value pairs
  const entries = Object.entries(inputObject);
  console.log(entries)
  // Sort the entries by the numeric value
  entries.sort((a, b) => b[1] - a[1]);

  // Convert the sorted entries back into an object
  return entries
}

const tags = ["Neporiadok a odpadky","Cyklostojany","Doprava a parkovanie","Cesty a chodniky","Údržba majetku","Dreviny a zeleň","Detské ihriská","Lavičky a koše",
  "Stavebný úrad","Nájomné bývanle","Dane a poplatky","Ľudia bez domova","Sociálna pomoc","Matrika a pobyty","Kultúra a šport","Iné podnety"]

const model = openai('gpt-4o-2024-08-06');

export async function getResponse(data: string[]) {
  const prompt: (TextPart | ImagePart | FilePart)[] = [{ type: 'text', text: 'These images are a report of a problem in town. Rank these categories on the most relevant in the format Category:number. Numbers range from 1-10' }];
  const imagePrompt: ImagePart[] = data.map((value) => { return { type: 'image', image: new URL(value) }});

  const rankingsSchema = tags.reduce((acc, tag) => {
    acc[tag] = z.number();
    return acc;
  }, {} as Record<string, z.ZodTypeAny>)
  const schema = z.object(
      {
        rankings:z.object(rankingsSchema)
      }

  );

  prompt.push(...imagePrompt);

  const { object } = await generateObject({
    model: model,
    schema: schema,
    messages: [
      {
        role: 'user',
        content: prompt
      },
    ],

  });
  const sorted = sortObjectByNumber(object.rankings)
  console.log(sorted)
  return {"rankings":sorted};
}