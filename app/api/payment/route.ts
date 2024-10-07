import { NextResponse } from 'next/server';
import paymentService from '@/services/payment';
import { Payment } from '@/types/payment';

// GET method - Fetch all payments or a specific payment by 'id'
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    try {
        if (id) {
            const payment = await paymentService.getPayment(id);
            if (!payment) {
                return NextResponse.json({ message: 'Payment not found' }, { status: 404 });
            }
            return NextResponse.json(payment);
        } else {
            const payments = await paymentService.getAllPayments();
            return NextResponse.json(payments);
        }
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// POST method - Add a new payment
export async function POST(req: Request) {
    const paymentToAdd: Payment = await req.json();

    try {
        const newPayment = await paymentService.addPayment(paymentToAdd);
        return NextResponse.json(newPayment, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// PUT method - Update a payment by 'id'
export async function PUT(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const paymentToUpdate: Partial<Payment> = await req.json();

    if (!id) {
        return NextResponse.json({ message: "'id' is required for updating" }, { status: 400 });
    }

    try {
        const updatedPayment = await paymentService.updatePayment(id, paymentToUpdate);
        return NextResponse.json(updatedPayment);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// DELETE method - Delete a payment by 'id'
export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ message: "'id' is required for deleting" }, { status: 400 });
    }

    try {
        await paymentService.deletePayment(id);
        return NextResponse.json({ message: 'Payment deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
