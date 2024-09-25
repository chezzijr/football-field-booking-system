import { MongoClient, ServerApiVersion } from "mongodb";
import config from "@/config/config";

export const client = new MongoClient(config.db.uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
    }
});
export const db = client.db(config.db.name);
