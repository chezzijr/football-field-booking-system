import { db } from './db';
import type { Field } from '@/types/field';

const coll = db.collection('football_field');

export default {
    read: async (no: number) => {
        return await coll.findOne({ no: no }) as Field | null;
    },
    readAll: async () => {
        return await coll.find().toArray() as any as Field[];
    },
    add: async (field: Field) => {
        await coll.insertOne(field);
        return field
    },
    update: async (no: number, field: Partial<Field>) => {
        const doc = await coll.findOneAndUpdate({ no: no }, { $set: field });
        return doc as Field | null
    },
    upsert: async (field: Field) => {
        const doc = await coll.findOneAndUpdate({ no: field.no }, { $set: field }, { upsert: true });
        return doc as Field | null;
    },
    delete: async (no: number) => {
        return await coll.findOneAndDelete({ no: no }) as Field | null;
    }
}
