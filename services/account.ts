
import { Account } from "@/types/account";
import accountModel from '@/db/account'

export default {
    getAccount: async(username: string, password: string): Promise<Account | null> => {
        if(!username || !password) {
            throw new Error(`username and password is required to get account`)
        }

        const res = await accountModel.read(username, password)
        if (!res) {
            throw new Error(`accout not found for getting`)
        }
        return res
    },

    updateAccount: async(username: string, account: Account): Promise<Account | null> => {
        if(!username) {
            throw new Error(`username is required to update account`)
        }

        const res = await accountModel.update(username, account)
        if (!res) {
            throw new Error(`accout not found for updating`)
        }
        return res
    },

    addAccount: async (account: Account) => {
        const { username, password, role } = account;

        if (username.length < 3 || username.length > 30) {
            throw new Error(`username length must be between 3-30`)
        }
        if (password.length < 8 || password.length > 16) {
            throw new Error(`password length must be between 8-16`)
        }
        let hasLowercase = false;
        let hasUppercase = false;
        let hasNumber = false;
        let hasSpecialChar = false;
        const passwordSpecial = "!@#$%^&*()"
        const usernameSpecial = "!\"#$%&'()*+,/:;<=>?@[\\]^`{|}~ \t\n\r";

        for (let char of username) {
            if (usernameSpecial.includes(char)) {
                throw new Error(`username contains unacceptable characters (only lowercase/ uppercase letter, number, special chars (. _ -) are allowed)`);
            }
        }

        for (let char of password) {
            if (char >= 'a' && char <= 'z') {
                hasLowercase = true;
            } else if (char >= 'A' && char <= 'Z') {
                hasUppercase = true;
            } else if (char >= '0' && char <= '9') {
                hasNumber = true;
            } else if (passwordSpecial.includes(char)) {
                hasSpecialChar = true
            } else {
                throw new Error(`password contains unacceptable characters (only ! @ # $ % ^ & * ( ) are allowed).`);
            }
        }

        if (!hasLowercase) {
            throw new Error(`password must contain at least one lowercase character`);
        }
        if (!hasUppercase) {
            throw new Error(`password must contain at least one uppercase character`);
        }
        if (!hasNumber) {
            throw new Error(`password must contain at least one number`);
        }
        if (!hasSpecialChar) {
            throw new Error(`password must contain at least one special character "! @ # $ % ^ & * ( ) "`);
        }
    
        if (role !== "admin" && role !== "manager") {
            throw new Error(`role must be "admin" or "manager"`)
        }
        
        const check = await accountModel.read(username, password)
        if (check) {
            throw new Error(`username or password already existed`)
        }

        const res = await accountModel.add(account)
        if (!res) {
            throw new Error(`failed to add new account`)
        }
        return res
    },

    deleteAccount: async(username: string) => {
        if(!username) {
            throw new Error(`username is required to delete account`)
        }

        const res = await accountModel.delete(username)
        if(!res) {
            throw new Error(`account with username = ${username} not found for deleting`)
        }
        return res
    }
}