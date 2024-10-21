import { db } from './db';
import type { Schedule } from '@/types/schedule';

const coll = db.collection('schedule');

export default {
    read: async (id: string) => {
        return await coll.findOne({ id: id }) as Schedule | null;
    }, 

    readAll: async () => {
        return await coll.find().toArray() as any as Schedule[];
    },
    
    add: async (sched: Schedule) => {
        await coll.insertOne(sched);
        return sched;
    },
    
    update: async (id: string, sched: Partial<Schedule>) => {
        const doc = await coll.findOneAndUpdate({ id }, { $set: sched });
        return doc as Schedule | null;
    },
    
    upsert: async (sched: Schedule) => {
        const doc = await coll.findOneAndUpdate({ id: sched.id }, { $set: sched }, { upsert: true });
        return doc as Schedule | null;
    },
    
    delete: async (id: string) => {
        return await coll.findOneAndDelete({ id }) as Schedule | null;
    }
}
