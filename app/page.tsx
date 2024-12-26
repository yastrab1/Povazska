import { dbGetAll } from "@/lib/dbFunctions";
import { getResponse } from "@/lib/completion";
import { imageex } from "@/lib/image";
import ImageUploadCard from "@/components/ui/upload";

export default async function Home() {
  //console.log(await dbGetAll("MestskePodnety", "Podnety"))
  //console.log((await getResponse(imageex)), 'ahoj')

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <ImageUploadCard />
    </main>
  );
}
