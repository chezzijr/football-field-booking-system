import { db } from './db';
import type { Schedule } from '@/types/schedule';

const coll = db.collection('schedule');

function getWeek() {
    const today = new Date()
    const day = today.getDay()
    const diff = today.getDate() - day + (day === 0 ? -6 : 1)
    const monday = new Date(today.setDate(diff))
    monday.setHours(0, 0, 0, 0)

    const sunday = new Date(monday)
    sunday.setDate(sunday.getDate() + 6)
    sunday.setHours(23, 59, 59, 999)

    return [monday, sunday]
}

export default {
    readCurrWeek: async () => {
        const [startMonday, endSunday] = getWeek();
        const docs = await coll.find({ start: { $gte: startMonday, $lte: endSunday } }).toArray() as any as Schedule[];
        return docs;
    },
    read: async (id: string) => {
        return await coll.findOne({ id: id }) as Schedule | null;
    }, 

    readAll: async () => {
        return await coll.find().toArray() as any as Schedule[];
    },
    add: async (sched: Schedule) => {
        await coll.insertOne(sched);
        return sched
    },
    update: async (id: string, sched: Partial<Schedule>) => {
        const doc = await coll.findOneAndUpdate({ id }, { $set: sched });
        return doc as Schedule | null
    },
    upsert: async (sched: Schedule) => {
        const doc = await coll.findOneAndUpdate({ id: sched.id }, { $set: sched }, { upsert: true });
        return doc as Schedule | null;
    },
    delete: async (id: string) => {
        return await coll.findOneAndDelete({ id }) as Schedule | null;
    }
}
