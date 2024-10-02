import { db } from "./db";
import type { Payment } from "@/types/payment";

const coll = db.collection("payment");

export default {
    read: async (id: string) => {
        return await coll.findOne({ id }) as Payment | null;
    },
    readAll: async () => {
        return await coll.find().toArray() as any as Payment[];
    },
    add: async (pm: Payment) => {
        await coll.insertOne(pm);
        return pm
    },
    update: async (id: string, pm: Partial<Payment>) => {
        const doc = await coll.findOneAndUpdate({ id }, { $set: pm });
        return doc as Payment | null
    },
    upsert: async (pm: Payment) => {
        const doc = await coll.findOneAndUpdate({ id: pm.id }, { $set: pm }, { upsert: true });
        return doc as Payment | null;
    },
    delete: async (id: string) => {
        return await coll.findOneAndDelete({ id }) as Payment | null;
    }
}

