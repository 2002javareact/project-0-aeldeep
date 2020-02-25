import { Request, Response, NextFunction } from "express"

//import { Request, Response, NextFunction } from "../../../../Demos-Copy/1Week/webflicks/node_modules/@types/express";


export function logMiddleware(req:Request, res:Response, next:NextFunction) 
{
    console.log(`Request Url is ${req.url} and Request Method is ${req.method} `)

    next()
}