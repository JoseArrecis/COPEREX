import { Router } from "express"
import { loginValidator, registerValidator } from "../../helpers/validators"
import { register } from "./auth.controller"

const api = Router

api.post(
    '/register',
    [
        registerValidator,
        deleteFileOnError
    ],
    register
)

api.post(
    '/login',
    [
        loginValidator
    ],
    
)