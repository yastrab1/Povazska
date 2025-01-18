import { openai } from '@ai-sdk/openai';
import { FilePart, generateObject, ImagePart, TextPart } from 'ai';
import {number, z, ZodEnum} from 'zod';

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
  const sortedKeys = Object.keys(object.rankings).sort((first,second)=>object.rankings[second] - object.rankings[first]);
  console.log(sortedKeys);
  console.log(object.rankings)
  return {"rankings":sortedKeys};
}