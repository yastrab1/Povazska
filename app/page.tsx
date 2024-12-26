import { dbGetAll } from "@/lib/dbFunctions";
import { getResponse } from "@/lib/completion";
import { imageex } from "@/lib/image";

export default async function Home() {
  // console.log(await dbGetAll("MestskePodnety", "Podnety"))
  console.log((await getResponse(imageex)), 'ahoj')

  return (
    <div className="bg-black w-100 h-100">
      aha
    </div>
  );
}
