import { ReimDTO } from "../dtos/ReimDTO";
import { reimbursement } from "../models/reimbursement";


export function reimDTOReimConverter(reimDTO:ReimDTO):reimbursement
{
    /*console.log('in converter:')
    console.log(reimDTO)
    console.log(reimbursement);*/
    
    return new reimbursement(
        reimDTO.reimbursementId,
        reimDTO.author,
        reimDTO.amount,
        reimDTO.dateSubmitted,
        reimDTO.dateResolved,
        reimDTO.description,
        reimDTO.resolver,
        reimDTO.status,
        reimDTO.type
    )
}