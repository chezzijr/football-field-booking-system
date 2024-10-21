import { NextResponse } from 'next/server';
import productService from '@/services/product';
import { Product } from '@/types/product';

export async function GET(req: Request) {
    try {
        const prods = await productService.getAllProduct();
        return NextResponse.json(prods);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const productToAdd: Product = await req.json();

    try {
        const newProd = await productService.addProduct(productToAdd);
        return NextResponse.json(newProd, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
