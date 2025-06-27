import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import mongoose from "mongoose";
const clientPromise:Promise<mongoose.mongo.MongoClient> = mongoose.connect(process.env.CONNECTION_STRING as string)
  .then(mongoose => mongoose.connection.getClient());
export const mongodbAdapter = MongoDBAdapter(clientPromise);