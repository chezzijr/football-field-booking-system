import { Schedule } from "@/types/schedule";
import scheduleModel from "@/db/schedule";

export default {
    getAllSchedules: async (): Promise<Schedule[]> => {
        return await scheduleModel.readAll();
    },
    

    addSchedule: async (sched: Schedule): Promise<Schedule> => {
        const { id, start, end, customer, customerPhone, fieldNo } = sched;

        if (!id) {
            throw new Error("schedule id is required for adding a new schedule");
        }
        
        if (!start || !end) {
            throw new Error("start and end dates are required for adding a new schedule");
        }
        
        if (new Date(start) >= new Date(end)) {
            throw new Error("start date must be earlier than end date");
        }
        
        if (!customer) {
            throw new Error("customer name is required for adding a new schedule");
        }
        
        if (!customerPhone) {
            throw new Error("customer phone is required for adding a new schedule");
        }

        const existingSchedules = await scheduleModel.readAll();
        const overlappingSchedule = existingSchedules.find((existingSched) =>
            existingSched.fieldNo === fieldNo &&
            (
                (new Date(start) < new Date(existingSched.end) && new Date(end) > new Date(existingSched.start))
            )
        );

        if (overlappingSchedule) {
            throw new Error(`schedule for fieldNo = ${fieldNo} overlaps with an existing schedule from ${overlappingSchedule.start} to ${overlappingSchedule.end}`);
        }

        const existingSchedule = await scheduleModel.read(id);
        if (existingSchedule) {
            throw new Error(`schedule with id = ${id} is already existed`);
        }

        const res = await scheduleModel.add(sched);
        if (!res) {
            throw new Error(`failed to add schedule with id = ${id}`);
        }
        
        return res;
    },

    updateSchedule: async (id: string, sched: Partial<Schedule>): Promise<Schedule | null> => {
        if (!id) {
            throw new Error("schedule id is required for updating");
        }

        const existingSchedule = await scheduleModel.read(id);
        if (!existingSchedule) {
            throw new Error(`schedule with id = ${id} not found for updating`);
        }

        const updatedSchedule = await scheduleModel.update(id, sched);
        if (!updatedSchedule) {
            throw new Error(`failed to update schedule with id = ${id}`);
        }

        return updatedSchedule;
    },

    deleteSchedule: async (id: string): Promise<Schedule | null> => {
        if (!id) {
            throw new Error("schedule id is required for deleting");
        }

        const existingSchedule = await scheduleModel.read(id);
        if (!existingSchedule) {
            throw new Error(`schedule with id = ${id} not found for deleting`);
        }

        const res = await scheduleModel.delete(id);
        if (!res) {
            throw new Error(`failed to delete schedule with id = ${id}`);
        }

        return res;
    }
};
