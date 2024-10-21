import { db } from './db';
import type { Product } from '@/types/product';

const coll = db.collection('product');

export default {
    readAll: async () => {
        return await coll.find().toArray() as any as Product[];
    },
    add: async (prod: Product) => {
        await coll.insertOne(prod);
        return prod
    },
    // update: async (id: string, prod: Partial<Product>) => {
    //     const doc = await coll.findOneAndUpdate({ id }, { $set: prod });
    //     return doc as Product | null
    // },
    // delete: async (id: string) => {
    //     return await coll.findOneAndDelete({ id }) as Product | null;
    // }
}
