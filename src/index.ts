import  express= require ('express')
import {logMiddleware} from './middleware/log_middleware'
import bodyParser = require('body-parser')
import {findUserByUsernameAndPassword} from "./services/user_services"
import { sessionMiddleware } from './middleware/session'
import { userRouter } from './routers/user-router'
import { reimRouter } from './routers/Reim-router'
import { corsFilter } from './middleware/cors-filter'



const pro = express()
pro.use('/',bodyParser.json())

pro.use(logMiddleware)
pro.use(sessionMiddleware)
pro.use(corsFilter)

pro.use('/users', userRouter)
pro.use('/reimbursements', reimRouter)

pro.post('/login', async (req,res)=>{
    
    const {username, password} = req.body
    
    if(!username || !password){
        res.status(400).send('Please Include Username and Password')
    } else {
        try {
            let user = await findUserByUsernameAndPassword(username,password)
            req.session.user = user// adds an object for us to use for auth
            res.status(200).json(user)// we do this for ourselves, when we start working on front end
        } catch(e){
            res.status(e.status).send(e.message)
        }
    }
})

/*function findUserByUsernameAndPassword(username:String, password:String) 
{
        for (let a of user) 
    {
            
       
    if(a.username === username && a.password === password)
        {
        return user
        }
    }
throw new invalidCredentialsError()
    
}*/





/*pro.use('/', (req,res)=>{
    res.send('Hello World')
})*/
pro.listen(1111, ()=>{
    console.log('app has started on port 1111');
})