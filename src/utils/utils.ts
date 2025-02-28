import bcrypt from 'bcryptjs';



class Utils {


    public async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSaltSync(10);
        return await bcrypt.hashSync(password, salt);
    }


    public async checkPassword(password: string, encryptedPassword: string): Promise<boolean> {
        return await bcrypt.compareSync(password, encryptedPassword);
    }


}


export const utils = new Utils();
