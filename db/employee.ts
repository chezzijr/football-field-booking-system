import { db } from "./db";
import type { Employee } from "@/types/employee";

const coll = db.collection("employee");

export default {
    read: async (id: string) => {
        return await coll.findOne({ id: id }) as Employee | null;
    },
    readAll: async () => {
        return await coll.find().toArray() as any as Employee[];
    },
    add: async (emp: Employee) => {
        await coll.insertOne(emp);
        return emp
    },
    update: async (id: string, field: Partial<Employee>) => {
        const doc = await coll.findOneAndUpdate({ id }, { $set: field });
        return doc as Employee | null
    },
    upsert: async (field: Employee) => {
        const doc = await coll.findOneAndUpdate({ id: field.id }, { $set: field }, { upsert: true });
        return doc as Employee | null;
    },
    delete: async (id: string) => {
        return await coll.findOneAndDelete({ id }) as Employee | null;
    }
}

