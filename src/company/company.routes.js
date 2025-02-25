import { Router } from "express"
import { 
    getCompanies, 
    registerCompany, 
    updateCompany
} from "./company.controller.js"
import { isAdmin, validateJwt } from "../../middleware/validate.jwt.js"
import { saveCompanyValidator } from "../../helpers/validators.js"

const api = Router()

api.post(
    '/',
    [
        validateJwt,
        saveCompanyValidator,
        isAdmin
    ],
    registerCompany
)

api.get(
    '/',
    [
        validateJwt,
        isAdmin
    ],
    getCompanies
)

api.put(
    '/:id',
    [
        validateJwt,
        isAdmin
    ],
    updateCompany
)

export default api