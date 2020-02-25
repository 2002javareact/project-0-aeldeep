export class reimbursement 
{
    reimbursementId: number  // primary key
	author: String   // foreign key -> User  not null
	amount: number   // not null
    dateSubmitted: number  // not null
    dateResolved: number  // not null
    description: string  // not null
    resolver: String  // foreign key -> User
    status: String  // foreign ey -> ReimbursementStatus  not null
    type: String // foreign key -> ReimbursementType
    
    constructor
    (
        reimbursementId: number, // primary key
        author: String,  // foreign key -> User, not null
        amount: number,  // not null
        dateSubmitted: number, // not null
        dateResolved: number, // not null
        description: string, // not null
        resolver: String, // foreign key -> User
        status: String, // foreign ey -> ReimbursementStatus, not null
        type: String // foreign key -> ReimbursementType
    ) 
    {
        this.reimbursementId= reimbursementId  // primary key
        this.author = author   // foreign key -> User  not null
        this.amount = amount   // not null
        this.dateSubmitted = dateSubmitted  // not null
        this.dateResolved = dateResolved  // not null
        this.description = description  // not null
        this.resolver = resolver  // foreign key -> User
        this.status = status  // foreign ey -> ReimbursementStatus  not null
        this.type = type 
    }
}