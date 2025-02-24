import { error } from 'console'
import { unLink } from 'fs/promises'
import { join } from 'path'

export const deleteFileOnError = async(error, req, res, next)=>{
    if(req.file && req.filePath){
        const filePath = join(req.filePath, req.file.fileName)
        try {
            await unLink(filePath)
            return next()
        } catch (unLinkErr) {
            console.error('Error deleting file: ', unLinkErr) 
        }
    }
    return res.status(500).send(
        {
            message: error.message
        }
    )
}