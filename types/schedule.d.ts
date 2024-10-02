export type Schedule = {
    id: string;
    fieldNo: number;
    start: Date;
    end: Date;
    duration: number;
    customer: string;
    customerPhone: string;
    paid: boolean;
}
