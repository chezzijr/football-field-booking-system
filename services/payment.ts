import { Payment } from "@/types/payment";
import paymentModel from "@/db/payment";

export default {
    getPayment: async (id: string): Promise<Payment | null> => {
        if (!id) {
            throw new Error("payment id is required");
        }

        const payment = await paymentModel.read(id);
        if (!payment) {
            throw new Error(`payment with id = ${id} not found`);
        }
        return payment;
    },

    getAllPayments: async (): Promise<Payment[]> => {
        return await paymentModel.readAll();
    },

    addPayment: async (pm: Payment): Promise<Payment> => {
        const { id, amount } = pm;

        if (!id) {
            throw new Error("payment id is required for adding a new payment");
        }
        if (!amount) {
            throw new Error("payment amount is required for adding a new payment");
        }

        const existingPayment = await paymentModel.read(id);
        if (existingPayment) {
            throw new Error(`payment with id = ${id} already exists`);
        }

        const res = await paymentModel.add(pm);
        if (!res) {
            throw new Error(`failed to add payment with id = ${id}`);
        }

        return res;
    },

    updatePayment: async (id: string, pm: Partial<Payment>): Promise<Payment | null> => {
        if (!id) {
            throw new Error("payment id is required for updating");
        }

        const existingPayment = await paymentModel.read(id);
        if (!existingPayment) {
            throw new Error(`payment with id = ${id} not found for updating`);
        }

        const updatedPayment = await paymentModel.update(id, pm);
        if (!updatedPayment) {
            throw new Error(`failed to update payment with id = ${id}`);
        }

        return updatedPayment;
    },

    deletePayment: async (id: string): Promise<Payment | null> => {
        if (!id) {
            throw new Error("payment id is required for deleting");
        }

        const existingPayment = await paymentModel.read(id);
        if (!existingPayment) {
            throw new Error(`payment with id = ${id} not found for deleting`);
        }

        const res = await paymentModel.delete(id);
        if (!res) {
            throw new Error(`failed to delete payment with id = ${id}`);
        }

        return res;
    }
};
