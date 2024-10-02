export type Account = {
    username: string;
    password: string;
    role: "admin" | "manager";
    created: Date;
    updated: Date;
}
