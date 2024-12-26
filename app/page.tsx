import { dbGetAll } from "@/lib/dbFunctions";

export default async function Home() {
  console.log(await dbGetAll("MestskePodnety", "Podnety"))

  return (
    <div className="bg-black w-100 h-100">
      aha
    </div>
  );
}
