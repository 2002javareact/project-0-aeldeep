export class UserDTO 
{
    userId: number  // primary key
	username: String  // not null  unique
	password: String  // not null
	firstName: String  // not null
	lastName: String  // not null
	email: String  // not null
	roleId: Number // not null
    role :String
    constructor
    (
        userId: number, // primary key
        username: String, // not null, unique
        password: String, // not null
        firstName: String, // not null
        lastName: String, // not null
        email: String, // not null
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