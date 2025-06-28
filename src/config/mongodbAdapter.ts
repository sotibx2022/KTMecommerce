import { MongoClient } from "mongodb";
import { config } from "./configuration";
const uri = config.connectionString
const options = {};
let client: MongoClient;
let clientPromise: Promise<MongoClient>;
declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}
export default clientPromise;
