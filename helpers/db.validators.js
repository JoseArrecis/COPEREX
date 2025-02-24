import User from '../src/user/user.model.js'
import { isValidObjectId } from 'mongoose'

export const existUsername = async(username)=>{
    const alreadyUsername = await User.findOne({username})
    if(alreadyUsername){
        console.error(`Username ${username} is already taken`)
        throw new Error(`Username ${username} us already taken`)
    }
}

export const existEmail = async(email)=>{
    const alreadyEmail = await User.findOne({email})
    if(alreadyEmail){
        console.error(`Email ${email} is already taken`)
        throw new Error(`Email ${email} is already taken`)
    }
}

export const existName = async(name)=>{
    const alreadyName = await User.findOne({name})
        if(alreadyName){
            console.error(`Email ${name} is already taken`)
            throw new Error(`Email ${email} is already taken`)
        }
}