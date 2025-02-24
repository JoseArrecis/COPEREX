import User from '../src/user/user.model.js'
import { isValidObjectId } from 'mongoose'

export const existUsername = async(username)=>{
    const alreadyUsername = await User.findOne({username})
    if(alreadyUsername){
        console.error(`Username ${username} is already taken`)
        throw new Error(`Username ${username} is already taken`)
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

export const existRole = async(role)=>{
    const alreadyRole = await User.findOne({role})
        if(alreadyRole){
            console.error(`Role ${role} is already taken`)
            throw new Error(`Role ${role} is already taken`)
        }
}

export const objetctIdValid = async(objectId)=>{
    if(!isValidObjectId(objectId)){
        throw new Error('Keeper is not objectId valid')
    }
}

export const findUser = async(id)=>{
    try{
        const userExist = await User.findById(id)
        if(!userExist) return false
        return userExist
    }catch(err){
        console.error(err)
        return false
    }
}
