"use client"
import { Field } from "@/types/field";
import { FormEvent, useState } from "react";

export type HomePageProps = {
    fields: Field[];
}

export default function HomePage(props: HomePageProps) {
    const [fields, setFields] = useState<Field[]>(props.fields);
    function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const newField: Field = {
            no: fields.length + 1,
            isAvailable: true,
            isMaintained: false
        }

        fetch("/api/fields", {
            method: "POST",
            body: JSON.stringify(newField)
        }).then((res) => {
            if (res.ok) {
                setFields([...fields, newField])
            } else {
                alert("Failed to add field: " + res.statusText)
            }
        }).catch((err) => {
            alert("Failed to add field: " + err)
        })
    }

    return (
        <>
            {
                fields.map((field: Field) => (
                    <div>
                        <h1>{field.no}</h1>
                        <p>{field.isAvailable}</p>
                        <p>{field.isMaintained}</p>
                    </div>
                ))
            }
            <form onSubmit={handleFormSubmit}>
                <button type="submit">Add Field</button>
            </form>
        </>
    );
}
