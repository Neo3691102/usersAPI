
import { query } from "../db";
import { User, UserData, UserStatus } from "../models/user";

//CAPA DE DATOS
export async function indexUsers(): Promise<User[]> {
    const result = await query("SELECT * FROM users");
    return result.rows;
}

export async function createUser(data: UserData): Promise<User> {
    const newUser = await query("INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
     [data.name, data.email]);
    return newUser.rows[0];
}

export async function updateUser(id: number, data: UserData): Promise<User[]>{ 
    const result = await query("UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *;",
    [data['name'], data['email'], id.toString()]);

    return result.rows[0];
}

export async function updateStatus(id: number, data: UserStatus): Promise<User[]>{ 
    const result = await query("UPDATE users SET isactive = $1 WHERE id = $2 RETURNING *;",
    [data['isactive'].toString(), id.toString()]);

    return result.rows[0];
}