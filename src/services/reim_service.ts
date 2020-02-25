import { reimbursement } from "../models/reimbursement";
import { daoFindReimByStatus } from "../repositories/reim-dao";


export async function findReimByStatus(status:Number) : Promise<reimbursement>
{
    //console.log('this is service:  ' +reimbursement);
    
    return await daoFindReimByStatus (status)
}