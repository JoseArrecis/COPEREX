import { Router } from "express"
import { addClient } from "./user.controller.js"
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

export default api