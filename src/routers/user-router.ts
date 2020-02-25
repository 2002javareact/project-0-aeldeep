import express = require('express')
import { auth,  authId } from '../middleware/auth-middleware'
import { User } from '../models/user';
import { findAllUsers, findUserById, saveOneUser } from '../services/user_services';
import { UserDTO } from '../dtos/UserDTO';


export const userRouter=express.Router()

userRouter.get('', [auth(['1','2']),  async (req,res)=>
{
    let users:User[] = await findAllUsers(); 
    res.json(users)
}]);

userRouter.post('', auth(['1']), async (req,res)=>
{
    let {
         username, password, 
        emailAddress, id,
        firstName, lastName,
        role
        }:
        {
            username:string,
            password:string,
            emailAddress:string,
            id:number,
            firstName:string,
            lastName:string,
            role:string
      
         } 
            = req.body// this will be where the data the sent me is
    // the downside is this is by default just a string of json, not a js object
    if(username && password && emailAddress && id && firstName && lastName && role)
    {       
        let newUser = await saveOneUser(new UserDTO(
                                            0,
                                            username,
                                            password,
                                            firstName,
                                            lastName,
                                            emailAddress,
                                            0,
                                            role,
                                            
        ))
// this would be some function for adding a new user to a db
        res.status(201).json(newUser);
    } else {
        res.status(400).send('Please include all user fields')
        // for setting a status and a body
    }
})




userRouter.patch('', auth(['1']), async (req,res)=>
{
    
    let {
         username, password, 
        emailAddress, id,
        firstName, lastName,
        role
        }:
        {
            username:string,
            password:string,
            emailAddress:string,
            id:number,
            firstName:string,
            lastName:string,
            role:string
      
         } 
            = req.body// this will be where the data the sent me is
    // the downside is this is by default just a string of json, not a js object
    if(username && password && emailAddress && id && firstName && lastName && role)
    {       
        let newUser = await saveOneUser(new UserDTO(
                                            0,
                                            username,
                                            password,
                                            firstName,
                                            lastName,
                                            emailAddress,
                                            0,
                                            role,
                                            
        ))
// this would be some function for adding a new user to a db
        res.status(201).json(newUser);
    } else {
        res.status(400).send('Please include all user fields')
        // for setting a status and a body
    }
})


// in express we can add a path variable by using a colon in the path
// this will add it to the request object and the colon makes it match anything
userRouter.get('/:id', auth(['1', '2', '3']), authId, async (req,res)=>{
    const id = +req.params.id// the plus sign is to type coerce into a number
    if(isNaN(id)){
        res.sendStatus(400)
    }else {
        try{
            let user = await findUserById(id)
            res.json(user)
            }
        catch(e){
            res.status(e.status).send(e.message)
            }
      
        
    }
})