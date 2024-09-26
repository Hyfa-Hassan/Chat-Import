import express, {Request, Response} from 'express';
import xlsx from 'xlsx';
import { Chat } from '../modals/chat';

export const importChat = async(req:Request, res:Response) => {
    try{
        const file = req.file;
        if(!file){
            res.status(400).send({message: 'No file uploaded'})
        }
        const workbook = xlsx.readFile('./excelFile/dummy.xlsx');
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const sheetData = xlsx.utils.sheet_to_json(worksheet);

        const chatHistory = sheetData.map((rows:any)=>({
            user: rows.user,
            message: rows.message
        }));
        await Chat.bulkCreate(chatHistory);
        res.status(200).send({message: 'Chat history imported'})
    }catch(error){
        res.status(500).send({message: 'Internal server error'})
    }
}