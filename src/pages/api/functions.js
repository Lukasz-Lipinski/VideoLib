import { MongoClient } from "mongodb";

export const connectDatebase = async () => {
  const client = await MongoClient.connect(
    process.env.NEXT_PUBLIC_MONGO_BASE_URL
  );

  return client;
};

export const insertData = async (client, collection, data) => {
  const db = client.db();
  await db.collection(collection).insertOne(data);
};

export const downloadUser = async (client, collection) => {
  const db = client.db();

  const document = await db.collection(collection).find().toArray();
  return document;
};
