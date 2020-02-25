import express = require('express')
import { auth, authId } from '../middleware/auth-middleware'
import { findReimByStatus, findReimById } from '../services/reim_service'


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

reimRouter.get('/reimbursements/author/userId/', auth(['1','2']),authId ,async(req,res)=>
{
    const id = +req.params.id//get the user ID
    if(isNaN(id)){
        res.sendStatus(400)
    }else {
        try{
            let reimbursement = await findReimById(id)
           // console.log('returning router value')
            //console.log(reimbursement)
            //console.log(findReimById(id));
            res.json(reimbursement)
            }
        catch(e){
            res.status(e.status).send(e.message)
            }
    }
})






