import express = require('express')
import { auth, authId } from '../middleware/auth-middleware'
import { findReimByStatus } from '../services/reim_service'


export const reimRouter=express.Router()
reimRouter.get('/:status',auth(['1','2', '3']),authId ,async(req,res)=>
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