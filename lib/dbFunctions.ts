import client from "@/lib/mongodb";

export async function dbGetAll(dbName: string, collectionName: string) {
    await client.connect() //connect to the cluster

    const db = client.db(dbName).collection(collectionName) //collect to the given collection
    const data = await db.find({}).toArray() //get all data
    return data //return all the data
}

export async function dbAddItem(dbName: string, collectionName: string, data: unknown) {
    await client.connect() //connect to the cluster

    const db = client.db(dbName).collection(collectionName)

    const result = await db.insertOne({ data });
    return result;
}