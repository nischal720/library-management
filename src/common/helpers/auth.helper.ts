import * as bcrypt from "bcrypt";

export class AuthHelper {
    static generateResetTokenExpiration(): Date {
        const now: Date = new Date();
        now.setMinutes(now.getMinutes() + 10);
        return now;
    }

    static async hashPassword(password: string): Promise<string> {
        return await bcrypt.hashSync(password, 6);
    }
}