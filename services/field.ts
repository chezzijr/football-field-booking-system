import type { Field } from '@/types/field';
import fieldModel from "@/db/field";

export default {
    getField: async (no: number): Promise<Field | null> => {
        if (!no) {
            throw new Error("field 'no' is required");
        }
        
        const res = await fieldModel.read(no);
        if (!res) {
            throw new Error(`field with no = ${no} not found`);
        }
        return res;
    },

    getAllFields: async (): Promise<Field[]> => {
        return await fieldModel.readAll();
    },

    addField: async (field: Field): Promise<Field> => {
        const { no } = field;
        
        if (!no) {
            throw new Error("field 'no' is required for adding a new field");
        }

        const existingField = await fieldModel.read(no);
        if (existingField) {
            throw new Error(`field with no = ${no} already exists`);
        }

        const res = await fieldModel.add(field);
        if (!res) {
            throw new Error(`failed to add field with no = ${no}`);
        }

        return res;
    },

    updateField: async (no: number, field: Partial<Field>): Promise<Field | null> => {
        if (!no) {
            throw new Error("field 'no' is required for updating");
        }

        const existingField = await fieldModel.read(no);
        if (!existingField) {
            throw new Error(`field with no = ${no} not found for updating`);
        }

        const updatedField = await fieldModel.update(no, field);
        if (!updatedField) {
            throw new Error(`failed to update field with no = ${no}`);
        }

        return updatedField;
    },

    deleteField: async (no: number): Promise<Field | null> => {
        if (!no) {
            throw new Error("field 'no' is required for deleting");
        }

        const existingField = await fieldModel.read(no);
        if (!existingField) {
            throw new Error(`field with no = ${no} not found for deleting`);
        }

        const deletedField = await fieldModel.delete(no);
        if (!deletedField) {
            throw new Error(`failed to delete field with no = ${no}`);
        }

        return deletedField;
    }
};
