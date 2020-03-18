import express = require('express')
import { auth, authId } from '../middleware/auth-middleware'
import { findReimByStatus, findReimById, saveOneReim, updateOneReim } from '../services/reim_service'
import { ReimDTO } from '../dtos/ReimDTO'
import * as session from 'express-session'
import { reimbursement } from '../models/reimbursement'



export const reimRouter=express.Router()

reimRouter.get('/status/:status',auth(['1','2']),authId ,async(req,res)=>
{
    const status = +req.params.status// the plus sign is to type coerce into a number
    if(isNaN(status)){
        res.sendStatus(400)
    }else {
        try{
            let reimbursement = await findReimByStatus(status)
           // console.log('returning router value')
            //console.log(reimbursement)
            //console.log(findReimByStatus(status));
            res.json(reimbursement)
            }
        catch(e){
            res.status(e.status).send(e.message)
            }
    }
})

reimRouter.get('/author/userId/:id', auth(['1','2','3']),authId ,async(req,res)=>
{
    const id = +req.params.id//get the user ID
       
    if(isNaN(id)){
        res.sendStatus(400)
    }else {
        try{
            let reimbursement = await findReimById(id)
           /* console.log('returning router value')
            console.log(reimbursement)
            console.log(findReimById(id));*/
            res.json(reimbursement)
            }
        catch(e){
            res.status(e.status).send(e.message)
            }
    }
})



reimRouter.post('',auth(['1','2','3']),authId ,async(req,res)=>
{
    const id = +req.session.user.userId
   // const ID = +req.params.id
    //get the user ID
    //console.log(req.session.user.userId);
   // console.log(' id is'+ id);
    if(isNaN(id)){
        res.sendStatus(400)
    }else {
    try {
    const {
            amount,description,type
            }:{  
                 amount:number,
                description:string,
                type:number
              }= req.body
    //console.log('amount , ID' +amount, id );
    
    if(amount && description && type )
    {       
        let newReimbursement = await saveOneReim(id,amount , description, type)
                                                                  
// this would be some function for adding a new user to a db
        res.status(201).json(newReimbursement);
    } else {
        res.status(400).send('Please Include all user fields')
        // for setting a status and a body
    }
    
} catch (e) {
    res.status(400).send('Please enter valied information')
}}
})


reimRouter.patch('',auth(['1','2']),authId ,async(req,res)=>
{
    try {
        let {reimbursementId,
            author,
            amount,
            dateSubmitted,
            dateResolved,
            description,
            resolver,
            status,
            type            
        }:{
            reimbursementId:number
            author:string
            amount:number
            dateSubmitted:string
            dateResolved:string
            description:string
            resolver:string
            status:string
            type:string
        }=req.body
       // console.log('returning router value')
        //console.log(reimbursement)
  
        if(reimbursementId&&author && amount && dateSubmitted && dateResolved && description && resolver && status&&type)
        {       
            let newReim = await updateOneReim(new ReimDTO(
                reimbursementId, author, amount,
                 dateSubmitted, 
                 dateResolved, description,
                 resolver,
                 status,type)
                 
            )
           // console.log(newReim);

    // this would be some function for adding a new user to a db
            res.status(201).json(newReim);
        } else {
            res.status(400).send('Please include all user fields')
            // for setting a status and a body
        }
            } catch (e) {
                res.status(400).send('Please enter valied information')
            
            }}
        )
        

    
