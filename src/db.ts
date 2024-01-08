import {Pool} from 'pg';

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'API-TESTER',
    user: 'postgres',
    password: 'postgres'
});

export const query = (text: string, params?: string[]) => {
    return pool.query(text, params);
}