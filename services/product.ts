import { Product } from "@/types/product";
import productModel from "@/db/product";
// import fieldModel from '@/db/field'

export default {
    getAllProduct: async (): Promise<Product[]> => {
        return await productModel.readAll();
    },

    addProduct: async (prod: Product): Promise<Product> => {
        const {
            name, quantity, price, total
        } = prod;
        
        const res = await productModel.add(prod);
        if (!res) {
            throw new Error(`failed to add product`);
        }
        return res;
    },
};

