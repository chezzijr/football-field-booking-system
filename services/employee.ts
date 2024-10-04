import type { Employee } from '@/types/employee';
import employeeModel from "@/db/employee";

const validateEmployeeId = (id: string) => {
    if (!id) {
        throw new Error("Employee ID is required");
    }
};

export default {
    getEmployee: async (id: string): Promise<Employee | null> => {
        validateEmployeeId(id)
        
        const res = await employeeModel.read(id);
        if (!res) {
            throw new Error(`field with no = ${id} not found`);
        }
        return res;
    },

    getAllEmployees: async (): Promise<Employee[]> => {
        return await employeeModel.readAll();
    },

    addEmployee: async (emp: Employee): Promise<Employee> => {
        const { id, name } = emp;
        
        validateEmployeeId(id);
        if (!name) {
            throw new Error("employee name is required for adding a new employee");
        }

        const validNameFormatRegex = /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/;
        if (!validNameFormatRegex.test(name)) {
            throw new Error("employee name must be capitalized correctly (e.g., 'Nguyen Van A' not 'ngUyEn VAn A) and only contains letters and spaces");
        }

        const check = await employeeModel.read(id);
        if (check) {
            throw new Error(`employee id = ${id} already exists`);
        }

        const res = await employeeModel.add(emp);
        if (!res) {
            throw new Error(`failed to add employee with id = ${id}`);
        }

        return res;
    },

    updateEmployee: async (id: string, emp: Partial<Employee>): Promise<Employee | null> => {
        validateEmployeeId(id);

        const check = await employeeModel.read(id);
        if (!check) {
            throw new Error(`employee id = ${id} not found for updating`);
        }

        const updatedField = await employeeModel.update(id, emp);
        if (!updatedField) {
            throw new Error(`failed to update employee with no = ${id}`);
        }

        return updatedField;
    },

    deleteEmployee: async (id: string): Promise<Employee | null> => {
        validateEmployeeId(id);

        const check = await employeeModel.read(id);
        if (!check) {
            throw new Error(`employee id = ${id} not found for deleting`);
        }

        const res = await employeeModel.delete(id);
        if (!res) {
            throw new Error(`failed to delete employee with id = ${id}`);
        }

        return res;
    }
};
