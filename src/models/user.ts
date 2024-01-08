import {z} from "zod";

export const userSchema = z.object({
    name: z.string({
        required_error: "Name required",
        invalid_type_error: "Name must be a string"
    }).min(1),//impide nulls y strings vacios,
    email: z.string({
        required_error: "Email required",
        invalid_type_error: "Email must be a string"
    }).email({message: "Invalid email"}).min(1),
    isactive: z.boolean({
        required_error: "isActive is required",
        invalid_type_error: "isActive must be a boolean"
    })
});

export const userStatusSchema = z.object({
    isactive: z.boolean({
        required_error: "isActive is required",
        invalid_type_error: "isActive must be a boolean"
    })
});

//MODELOS O TABLAS DE LA BASE DE DATOS===============================
export type User = {
    id: number,
    name: string,
    email: string,
    isactive: boolean
}

export type UserData = z.infer<typeof userSchema>;

export type UserStatus = z.infer<typeof userStatusSchema>;