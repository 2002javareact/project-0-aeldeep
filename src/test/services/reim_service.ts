import { reimbursement } from "../models/reimbursement";
import { daoFindReimByStatus, daoFindReimById, daosaveOneReim, daoUpdateOneReim } from "../repositories/reim-dao";
import { ReimDTO } from "../dtos/ReimDTO";


export async function findReimByStatus(status:Number) : Promise<reimbursement[]>
{   //console.log('this is service:  ' +reimbursement);
    return await daoFindReimByStatus (status)
}


    export async function findReimById(id:Number) : Promise<reimbursement[]>
{   //console.log('this is service:  ' +reimbursement);
    return await daoFindReimById (id)
}


export async function saveOneReim(id:Number,amount:Number , description:String, type:Number) : Promise<reimbursement>
{  // console.log('this is service:  ' +reimbursement);
    return await daosaveOneReim (id,amount , description, type)

   
}



    export async function updateOneReim(newReim:ReimDTO):Promise<reimbursement>
    {
      // console.log('this is service ' +reimbursement  );
        return await daoUpdateOneReim(newReim)
    }
    

