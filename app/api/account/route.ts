import { NextResponse } from 'next/server';
import accountService from '@/services/account';
import { Account } from '@/types/account';

// GET method - Fetch an account by username and password
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');
    const password = searchParams.get('password');

    try {
        const account = await accountService.getAccount(username as string, password as string);
        return NextResponse.json(account);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// POST method - Add a new account
export async function POST(req: Request) {
    const accountToAdd: Account = await req.json();

    try {
        const newAccount = await accountService.addAccount(accountToAdd);
        return NextResponse.json(newAccount, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// PUT method - Update an account by username
export async function PUT(req: Request) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');
    const accountToUpdate: Account = await req.json();

    if (!username) {
        return NextResponse.json({ message: "'username' is required for updating" }, { status: 400 });
    }

    try {
        const updatedAccount = await accountService.updateAccount(username as string, accountToUpdate);
        return NextResponse.json(updatedAccount);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// DELETE method - Delete an account by username
export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');

    if (!username) {
        return NextResponse.json({ message: "'username' is required for deleting" }, { status: 400 });
    }

    try {
        const deletedAccount = await accountService.deleteAccount(username as string);
        return NextResponse.json(deletedAccount);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
