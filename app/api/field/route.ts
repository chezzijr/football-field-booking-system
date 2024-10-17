import { NextResponse } from 'next/server';
import fieldService from '@/services/field';
import { Field } from '@/types/field';

// GET method - Fetch all fields or a specific field by 'no'
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const no = searchParams.get('no');

    try {
        if (no) {
            const field = await fieldService.getField(Number(no));
            if (!field) {
                return NextResponse.json({ message: 'Field not found' }, { status: 404 });
            }
            return NextResponse.json(field);
        } else {
            const fields = await fieldService.getAllFields();
            return NextResponse.json(fields);
        }
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// POST method - Add a new field
export async function POST(req: Request) {
    const fieldToAdd: Field = await req.json();
    
    try {
        const newField = await fieldService.addField(fieldToAdd);
        return NextResponse.json(newField, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// PUT method - Update a field by 'no'
export async function PUT(req: Request) {
    const { searchParams } = new URL(req.url);
    const no = searchParams.get('no');
    const fieldToUpdate: Partial<Field> = await req.json();

    if (!no) {
        return NextResponse.json({ message: "'no' is required for updating" }, { status: 400 });
    }

    try {
        const updatedField = await fieldService.updateField(Number(no), fieldToUpdate);
        return NextResponse.json(updatedField);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// DELETE method - Delete a field by 'no'
export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const no = searchParams.get('no');

    if (!no) {
        return NextResponse.json({ message: "'no' is required for deleting" }, { status: 400 });
    }

    try {
        const deletedField = await fieldService.deleteField(Number(no));
        return NextResponse.json(deletedField);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
