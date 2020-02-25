export class User 
{
    userId: number  // primary key
	username: string  // not null  unique
	password: string  // not null
	firstName: string  // not null
	lastName: string  // not null
	email: string  // not null
	roleId: Number // not null
    role :String
    constructor
    (
        userId: number, // primary key
        username: string, // not null, unique
        password: string, // not null
        firstName: string, // not null
        lastName: string, // not null
        email: string, // not null
        roleId: Number, // not null
        role :String
    ) 
    {
         this.userId=userId
         this.username=username
         this.password=password
         this.firstName= firstName
         this.lastName=lastName
         this.email=email
         this.roleId= roleId
         this.role = role
    }
}