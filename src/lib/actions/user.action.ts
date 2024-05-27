"use server"

import User from '@/lib/model/user.model'
import { connectToDatabase } from '@/lib/monogodb/database/index'

export async function createUser(user:any) {
    
    try {
        await connectToDatabase();

        const newUser = await User.create(user)
        return JSON.parse(JSON.stringify(newUser))
        
    } catch (error) {
        console.log(error);
        
    }
}