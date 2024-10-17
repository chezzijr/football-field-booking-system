import { NextResponse } from 'next/server';
import employeeService from '@/services/employee';
import { Employee } from '@/types/employee';

// GET method - Fetch all employees or a specific employee by 'id'
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    try {
        if (id) {
            const employee = await employeeService.getEmployee(id);
            if (!employee) {
                return NextResponse.json({ message: 'Employee not found' }, { status: 404 });
            }
            return NextResponse.json(employee);
        } else {
            const employees = await employeeService.getAllEmployees();
            return NextResponse.json(employees);
        }
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// POST method - Add a new employee
export async function POST(req: Request) {
    const employeeToAdd: Employee = await req.json();

    try {
        const newEmployee = await employeeService.addEmployee(employeeToAdd);
        return NextResponse.json(newEmployee, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// PUT method - Update an employee by 'id'
export async function PUT(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const employeeToUpdate: Partial<Employee> = await req.json();

    if (!id) {
        return NextResponse.json({ message: "'id' is required for updating" }, { status: 400 });
    }

    try {
        const updatedEmployee = await employeeService.updateEmployee(id, employeeToUpdate);
        return NextResponse.json(updatedEmployee);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// DELETE method - Delete an employee by 'id'
export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ message: "'id' is required for deleting" }, { status: 400 });
    }

    try {
        await employeeService.deleteEmployee(id);
        return NextResponse.json({ message: 'Employee deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
