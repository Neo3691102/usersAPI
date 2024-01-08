import * as userDB from "../data/users-data"; 
import { UserData, UserStatus } from "../models/user";


//CAPA DE NEGOCIO
export async function getUsers() {
    const users = await userDB.indexUsers();
    return users;
}

export async function createUsers(userData: UserData) {
    const newUser = await userDB.createUser(userData);
    return newUser;
}

export async function updateUser(id: number, userData: UserData) {
    const user = await userDB.updateUser(id, userData);
    return user;
}

export async function updateStatus(id: number, userData: UserStatus) {
    const user = await userDB.updateStatus(id, userData);
    return user;
}
