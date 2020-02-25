import { daoFindUserByUsernameAndPassword, daoFindAllUsers, daoSaveOneUser, daoFindUserById } from "../repositories/user-dao"
import {  User } from "../models/user"
import { UserDTO } from "../dtos/UserDTO"



export async function findUserByUsernameAndPassword(username:string, password:string): Promise<User>
{
    return daoFindUserByUsernameAndPassword(username,password)
}

export async function findAllUsers():Promise<User[]>{
    // I write to a different table, who just sent this request
    // know what time of day, these requests get most sent
    return await daoFindAllUsers()
 }
 
 
 export async function saveOneUser(newUser:UserDTO):Promise<User>{
    //console.log('this is service ' );
    
    return await daoSaveOneUser(newUser)
 }
 
 
 
 export async function findUserById(id:number):Promise<User>{
    return await daoFindUserById(id)
 }