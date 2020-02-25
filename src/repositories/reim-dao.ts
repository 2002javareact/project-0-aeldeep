import { reimbursement } from "../models/reimbursement";
import { PoolClient } from "pg";
import { connectionPool } from ".";
import { reimDTOReimConverter } from "../util/reim_dto_to_reim";
import { invalidCredentialsError, InternalServerError } from "../errors/log_Error";

export async function daoFindReimByStatus(status):Promise<reimbursement[]>
{
    let client:PoolClient//  potential connection to db
    try {
        client = await connectionPool.connect()
        let dropView=('drop view if exists reim ;')
        let createView=('create or replace view reim as select r."reimbursementId" ,r.status as statusId ,r.author  ,r.amount ,r."dateSubmitted" ,r."dateResolved" ,r.description ,u.username as resolver  ,s.status ,t."type"  from reimbursement.users u ,reimbursement.reimbursement r, reimbursement.reimbursementstatus s, reimbursement.reimbursementtype t	where r.status  = s."statusId" and r."type" =t."typeId" and r.resolver =u."userId" ;')

        let results = await client.query
        (' select reim."reimbursementId", u.username as author,reim.amount,reim."dateSubmitted" ,reim."dateResolved" ,reim.description ,reim.resolver as resolver ,reim.status,reim.statusID ,reim."type" from reim  ,reimbursement.users u where  reim.author =u."userId" and reim.statusId = $1 order by reim."dateSubmitted"; ', [status])
        if(results.rowCount === 0){
            throw new Error('Rembursement Not Found')
        }
        //console.log(results);
       return results.rows.map(reimDTOReimConverter)
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


export async function daoFindReimById(id):Promise<reimbursement[]>
{
    let client:PoolClient//  potential connection to db
    try {
       // console.log(id);
        
        client = await connectionPool.connect()
        let results = await client.query
        ('select r."reimbursementId" ,r.status as statusId ,r.author  ,r.amount ,r."dateSubmitted" ,r."dateResolved" ,r.description ,u.username as resolver  ,s.status ,t."type"  from reimbursement.users u ,reimbursement.reimbursement r, reimbursement.reimbursementstatus s, reimbursement.reimbursementtype t	where r.status  = s."statusId" and r."type" =t."typeId" and r.resolver =u."userId" and r.author =$1 order by r."dateSubmitted" ;', [id])
        if(results.rowCount === 0){
            //console.log(results);
            
            throw new Error('Rembursement Not Found')
        }
        console.log(results);
       return results.rows.map(reimDTOReimConverter)
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


/*
export async function daoFindReimById(status):Promise<reimbursement>
{
    let client:PoolClient// our potential connection to db
    try {
        client = await connectionPool.connect()
        let results = await client.query
        ('select r."reimbursementId" ,r.status as statusId ,r.author  ,r.amount ,r."dateSubmitted" ,r."dateResolved" ,r.description ,u.username as resolver ,s.status ,t."type"  from reimbursement.users u ,reimbursement.reimbursement r, reimbursement.reimbursementstatus s, reimbursement.reimbursementtype t	where r.status  = s."statusId" and r."type" =t."typeId" and r.resolver =u."userId" and r.author = $1 ', [status])
        if(results.rowCount === 0){
            throw new Error('Rembursement Not Found')
        }
        console.log(results);
        return reimDTOReimConverter(results.rows[0])
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

*/

