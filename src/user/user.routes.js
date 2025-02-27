import { Router } from "express"
import { 
    addClient, 
    deleteOne, 
    updateUser 
} from "./user.controller.js"
import { registerValidator } from "../../helpers/validators.js"
import { deleteFileOnError } from "../../middleware/delete.file.on.error.js"
import { isAdmin, validateJwt } from "../../middleware/validate.jwt.js"

const api = Router()

api.post(
    '/register',
    [
        registerValidator,
        validateJwt,
        deleteFileOnError,
        isAdmin
    ],
    addClient
)

api.put(
    '/:id',
    [
        validateJwt,
        isAdmin
    ],
    updateUser
)

api.delete(
    '/:id',
    [
        validateJwt,
        isAdmin
    ],
    deleteOne
)

export default api