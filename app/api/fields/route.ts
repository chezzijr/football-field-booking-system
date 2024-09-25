import type { NextApiRequest, NextApiResponse } from 'next'
import fieldColl from '@/db/field';
import type { Field } from '@/types/field';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');
    if (id) {
        const field = await fieldColl.read(id);
        return NextResponse.json(field, {
            status: field ? 200 : 404
        })
    } else {
        const fields = await fieldColl.readAll();
        return NextResponse.json(fields, {
            status: 200
        })
    }
}

export async function POST(req: NextRequest) {
    const body = await req.json() as Field;
    const result = await fieldColl.add(body);
    return NextResponse.json(result, {
        status: 201
    })
}

export async function PATCH(req: NextRequest) {
    const body = await req.json() as Field;
    const result = await fieldColl.update(body.no, body);
    return NextResponse.json(result, {
        status: 200
    })
}

export async function DELETE(req: NextRequest) {
    const body = await req.json() as { no: number };
    const result = await fieldColl.delete(body.no);
    return NextResponse.json(result, {
        status: 200
    })
}
