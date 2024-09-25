"use server"
import fieldColl from "@/db/field"
import { Field } from "@/types/field";
import HomePage from "./HomePage";

export default async function Home() {
    const requestedFields: Field[] = await fieldColl.readAll();

    return <HomePage fields={requestedFields} />
}
