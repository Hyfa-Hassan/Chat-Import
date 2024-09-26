import express, {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import  jwt  from 'jsonwebtoken';
import { User } from "../modals/user";

export const addUser = async(req:Request, res:Response) => {
    try{
        const data = req.body;
        const existingUser = await User.findByPk(data.email);
        if(existingUser){
            res.status(400).send({message: 'User already exists'})
        }
        const hashPassword = await bcrypt.hash(data.password, 10);
        data.password = hashPassword;
        const result = await User.create(data);
        if(!result){
            res.status(400).send({message: 'Bad Request'})
        }
        res.status(201).send({message: "Success", result});
    }catch(error){
        res.status(500).send({message: 'Internal server error'})
    }
}

export const login = async(req:Request, res:Response) => {
    try{
        const data = req.body;
        const result:any = await User.findByPk(data.email);
        if(!result){
            res.status(400).send({message: 'Invalid Credentials'})
        }
        const isPassValid = await bcrypt.compare(data.password, result.password)
        if(!isPassValid){
            res.status(400).send({message: 'Invalid Credentials'})
        }
        const token = jwt.sign({userId: data.email}, 'asdfg', {expiresIn: '1h'})
        res.status(201).send(token);
    }catch(error){
        res.status(500).send({message: 'Internal server error'})
    }
}