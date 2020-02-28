export class reimbursementType 
{
    typeId: number // primary key
    type: string  // not null, unique
    constructor
    (
        typeId: number, // primary key
        type: string, // not null, unique
    ) 
    {
        this.typeId= typeId,
        this.type = type
    }
}