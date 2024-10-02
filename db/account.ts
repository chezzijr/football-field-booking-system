import { db } from "./db";
import type { Account } from "@/types/account";

const coll = db.collection("account");

export default {
    read: async (username: string, password: string) => {
        return await coll.findOne({ username, password }) as Account | null;
    },
    add: async (account: Account) => {
        await coll.insertOne(account);
        return account;
    },
    update: async (username: string, account: Partial<Account>) => {
        const doc = await coll.findOneAndUpdate({ username }, { $set: account });
        return doc as Account | null;
    },
    upsert: async (account: Account) => {
        const doc = await coll.findOneAndUpdate({ username: account.username }, { $set: account }, { upsert: true });
        return doc as Account | null;
    },
    delete: async (username: string) => {
        const doc = await coll.findOneAndDelete({ username });
        return doc as Account | null;
    }
}
