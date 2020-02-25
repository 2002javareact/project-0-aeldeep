
import { HttpError } from "./HttpError";


export class invalidCredentialsError extends HttpError
{
    constructor()
    {
        super('Invalid Credentials', 400)
    }
}
export class unauthurized extends HttpError 
{
    constructor() 
    {
        super ('The incoming token has expired',401)
    }
}

export class UserNotFoundError extends HttpError {
    constructor(){
        super('User Not Found', 404)
    }
}

export class InternalServerError extends HttpError{
    constructor(){
        super('Internal Server Error', 500)
    }
}