import { NextResponse } from 'next/server';
import scheduleService from '@/services/schedule';
import { Schedule } from '@/types/schedule';

// GET method - Fetch all schedules or current week schedules
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const currentWeek = searchParams.get('currentWeek');

    try {
        if (currentWeek) {
            const schedules = await scheduleService.getCurrentWeekSchedules();
            return NextResponse.json(schedules);
        } else {
            const schedules = await scheduleService.getAllSchedules();
            return NextResponse.json(schedules);
        }
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// POST method - Add a new schedule
export async function POST(req: Request) {
    const scheduleToAdd: Schedule = await req.json();

    try {
        const newSchedule = await scheduleService.addSchedule(scheduleToAdd);
        return NextResponse.json(newSchedule, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// PUT method - Update a schedule by 'id'
export async function PUT(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const scheduleToUpdate: Partial<Schedule> = await req.json();

    if (!id) {
        return NextResponse.json({ message: "'id' is required for updating" }, { status: 400 });
    }

    try {
        const updatedSchedule = await scheduleService.updateSchedule(id, scheduleToUpdate);
        return NextResponse.json(updatedSchedule);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// DELETE method - Delete a schedule by 'id'
export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ message: "'id' is required for deleting" }, { status: 400 });
    }

    try {
        const deletedSchedule = await scheduleService.deleteSchedule(id);
        return NextResponse.json(deletedSchedule);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
