import { PoolClient } from "pg";
import { connectionPool } from ".";
import {User} from "../models/user";
import { invalidCredentialsError, unauthurized, UserNotFoundError, InternalServerError } from "../errors/log_Error";
import { UserDTO } from "../dtos/UserDTO";
import { userDTOToUserConverter } from "../util/user_dto_to_user";

export async function daoFindUserByUsernameAndPassword(username:string,password:string):Promise<User>{
    let client:PoolClient// our potential connection to db
    try {
        client = await connectionPool.connect()
        // a paramaterized query
        let results = await client.query
        ('SELECT * FROM reimbursement.users U inner join reimbursement.roles R on U."roleId" = R."roleId"  WHERE username = $1  and "password" = $2', [username,password])
        if(results.rowCount === 0){
            throw new Error('User Not Found')
        }
        return userDTOToUserConverter(results.rows[0])
    } catch(e){
        console.log(e);
        if(e.message === 'User Not Found'){
            throw new invalidCredentialsError()
        }else {
            throw new InternalServerError()
        }
    } finally {
        console.log('DB connection had been Terminated');
        
        client && client.release()
    }
}



// this function gets anf formats all users
export async function daoFindAllUsers():Promise<User[]>{
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        let results = await client.query
        ('SELECT * FROM reimbursement.users U inner join reimbursement.roles R on U."roleId" = R."roleId"')
        return results.rows.map(userDTOToUserConverter)
      
        

    }catch(e){
        throw new InternalServerError()
    } finally {
        client && client.release()
    }

}


// function that saves a new user and returns that user with its new id
export async function daoSaveOneUser(newUser:UserDTO):Promise<User> {
    let client:PoolClient
   // console.log('this is dao function   '+ UserDTO);
    
    try { 
        client = await connectionPool.connect()
        // send a query and immeadiately get the role id matching the name on the dto
         let role_Id = (await client.query('SELECT * FROM reimbursement.roles WHERE "role" =  $1', [newUser.role])).rows[0].roleId
     //   console.log(`This After Sellection value ${role_Id}`);
        
        // send an insert that uses the id above and the user input
        let result = await client.query('INSERT INTO reimbursement.users ( username, "password", "firstName", "lastName", email, "roleId") values ($1,$2,$3,$4,$5,$6) RETURNING "userId";',
        [newUser.username, newUser.password,  newUser.firstName, newUser.lastName,newUser.email, role_Id])
       // console.log( '  this is db   ' +result);
        
        // put that newly genertaed user_id on the DTO 
        newUser.userId = result.rows[0].userId
        return userDTOToUserConverter(newUser)// convert and send back
    } catch(e){

        throw new InternalServerError()
    } finally {
        client && client.release()
    }
}


export async function daoFindUserById(id:number):Promise<User>{
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        let result = await client.query
        ('SELECT * FROM reimbursement.users U inner join reimbursement.roles R on U."roleId"  = R."roleId" WHERE U."userId"= $1', [id])
        if(result.rowCount === 0){
            throw new Error('User Not Found')
        }
        return userDTOToUserConverter(result.rows[0])

    }catch(e){
        // id DNE
        //need if for that
        if(e.message ==='User Not Found'){
            throw new UserNotFoundError()
        }
        throw new InternalServerError()
    } finally {
        client && client.release()
    }
}




/*
export async function daoFindUserByUsernameAndPassword(username:String , password:String ):Promise<user>
{
let client:PoolClient
try 
{
    client= await connectionPool.connect()
    let results = await client.query(`SELECT * FROM reimbursement."user" WHERE USERNAME = '${username}' and "password"= '${password}';`)
    return new user( results.rows[0].userId ,
                     results.rows[0].username,
                     results.rows[0].password,
                     results.rows[0].firstName,
                     results.rows[0].lastName,
                     results.rows[0].email,
                     results.rows[0].role
                    );

} 
catch (e) 
{
    console.log(e);
    if (e.message==='User Not Found') 
    {
        throw new invalidCredentialsError;
    }
    else
    {
        throw new unauthurized;
    }
}
finally
{
    client&&client.release()
}
}*/




