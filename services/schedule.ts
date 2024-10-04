import { Schedule } from "@/types/schedule";
import scheduleModel from "@/db/schedule";
import fieldModel from '@/db/field'

export default {
    getCurrentWeekSchedules: async (): Promise<Schedule[]> => {
        const schedules = await scheduleModel.readCurrWeek();
        if (!schedules) throw new Error(`failed to get current week scheules`)
        return schedules;
    },

    getAllSchedules: async (): Promise<Schedule[]> => {
        return await scheduleModel.readAll();
    },

    addSchedule: async (sched: Schedule): Promise<Schedule> => {
        const { id, fieldNo, start, end, duration, customer, customerPhone, paid } = sched;

        if (!id) {
            throw new Error("schedule id is required for adding a new schedule");
        }
        if (!fieldNo) {
            throw new Error("field number is required for adding a new schedule");
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
        if (!duration) {
            throw new Error("duration is required for adding a new schedule");
        }
        if (paid === undefined || paid === null) {
            throw new Error("paid is required for adding a new schedule");
        }

        const check = await fieldModel.read(fieldNo)
        if (!check) throw new Error(`field not found`)
        if (check.isAvailable === false) throw new Error(`field is already booked`)
        if (check.isMaintained === true) throw new Error(`field is currently under mainternance`)

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

