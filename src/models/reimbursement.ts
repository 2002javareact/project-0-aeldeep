export class reimbursement 
{
    reimbursementId: number  // primary key
	author: string   // foreign key -> User  not null
    amount: number   // not null
    dateSubmitted: string  // not null
    dateResolved: string  // not null
    description: string  // not null
    resolver: string  // foreign key -> User
    status: string  // foreign ey -> ReimbursementStatus  not null
    type: string // foreign key -> ReimbursementType
    
    constructor
        (reimbursementId: number, // primary key
        author: string,  // foreign key -> User, not null
        amount: number,  // not null
        dateSubmitted: string, // not null
        dateResolved: string, // not null
        description: string, // not null
        resolver: string, // foreign key -> User
        status: string, // foreign ey -> ReimbursementStatus, not null
        type: string,
      
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