import { reimbursement } from "../models/reimbursement";
import { PoolClient } from "pg";
import { connectionPool } from ".";
import { reimDTOReimConverter } from "../util/reim_dto_to_reim";
import { invalidCredentialsError, InternalServerError, unauthurized } from "../errors/log_Error";
import { ReimDTO } from "../dtos/ReimDTO";

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
        //console.log(results);
       return results.rows.map(reimDTOReimConverter)
    } catch(e){
        console.log(e);
        if(e.message === 'Rembursement Not Found'){
            throw new invalidCredentialsError()
        }else {
            throw new InternalServerError()
        }
    } finally {
        console.log('DB connection had been Terminated');
        
        client && client.release()
    }
}



export async function daosaveOneReim(id:Number ,amount:Number , description:String, type:Number):Promise<reimbursement>{
    let client:PoolClient// our potential connection to db
    try {
        client = await connectionPool.connect()
        // a paramaterized query
        let date = new Date()
        //console.log( `ID IS ${id} amount = ${amount}  type = ${type}   Date = ${date}`);
        let results = await client.query
        ('Insert into reimbursement.reimbursement ( author ,amount ,"dateSubmitted" ,"dateResolved" ,description ,resolver ,status ,"type" ) values ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING "reimbursementId";'
        ,[id,amount,date,'01-01-1111',description,3,1,type])
        if(results.rowCount === 0){
            throw new  unauthurized()
        }
        id = results.rows[0].reimbursementId
      //  return reimDTOReimConverter(results.rows[0].reimbursementId)
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


//update Reimbursement
export async function daoUpdateOneReim(newReim:ReimDTO):Promise<reimbursement> {
    let client:PoolClient
    //console.log('this is dao function   '+ ReimDTO);
    try { 
        client = await connectionPool.connect()
        // send a query and immeadiately get the role id matching the name on the dto
       //  let role_Id = (await client.query('SELECT * FROM reimbursement.roles WHERE "role" =  $1', [newUser.role])).rows[0].roleId
        //console.log(`This After Sellection value ${role_Id}`);
        // send an insert that uses the id above and the user input
        let result = await client.query('update reimbursement.reimbursement set "reimbursementId" =$1,author =$2 , amount =$3, "dateSubmitted" =$4,"dateResolved" =$5,description =$6,resolver =$7,status =$8,"type" =$9 where "reimbursementId" =$1  RETURNING "reimbursementId" ;',
        [newReim.reimbursementId, +newReim.author , newReim.amount, newReim.dateSubmitted,newReim.dateResolved, newReim.description
            ,newReim.resolver,newReim.status, newReim.type])
        // console.log( '  this is db   ' +result);
        // put that newly genertaed user_id on the DTO 
       newReim.reimbursementId = result.rows[0].reimbursementId
        return reimDTOReimConverter(newReim)// convert and send back
    } catch(e){
       // console.log(e);
        
        throw new invalidCredentialsError()
    } finally {
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

