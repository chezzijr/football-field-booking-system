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
        const docs = await coll.find({ date: { $gte: startMonday, $lte: endSunday } }).toArray() as any as Schedule[];
        return docs;
    },
    readAll: async () => {
        return await coll.find().toArray() as any as Schedule[];
    },
    add: async (sched: Schedule) => {
        await coll.insertOne(sched);
        return sched
    },
    update: async (date: Date, time: number, sched: Partial<Schedule>) => {
        const doc = await coll.findOneAndUpdate({ date, time }, { $set: sched });
        return doc as Schedule | null
    },
    upsert: async (sched: Schedule) => {
        const doc = await coll.findOneAndUpdate({ date: sched.date, time: sched.time }, { $set: sched }, { upsert: true });
        return doc as Schedule | null;
    },
    delete: async (date: Date, time: number) => {
        return await coll.findOneAndDelete({ date, time }) as Schedule | null;
    }
}
