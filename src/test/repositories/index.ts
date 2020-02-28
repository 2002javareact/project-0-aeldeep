import {Pool} from 'pg';

export const connectionPool : Pool = new Pool ({
    host:process.env[ 'pro_Host'],
    user: process.env['pro_user'],
    password: process.env['pro_password'],
    database :process.env['pro_db_name'],
    port :5432,
    max:5 //max connection in free tier database
})