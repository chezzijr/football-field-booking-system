import { db } from './db';
import type { Field } from '@/types/field';

const coll = db.collection('football_field');

export default {
    read: async (id: string) => {
        return await coll.findOne({ id: id }) as Field | null;
    },
    readAll: async () => {
        return await coll.find().toArray() as any as Field[];
    },
    add: async (field: Field) => {
        coll.insertOne(field);
        return field
    },
    update: async (no: number, field: Partial<Field>) => {
        const doc = await coll.findOneAndUpdate({ no: no }, { $set: field });
        return doc as Field | null
    },
    delete: async (no: number) => {
        return await coll.findOneAndDelete({ no: no }) as Field | null;
    }
}
