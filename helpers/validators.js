import { body } from "express-validator"
import { 
    validateErrors
} from "./validate.error.js"
import {
    existEmail,
    existUsername,
    existCompanyName
} from "./db.validators.js"

export const registerValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('surname', 'Surname cannot be empty')
        .notEmpty(),
    body('email', 'Email cannot be empty or is not a valid email')
        .notEmpty()
        .isEmail()
        .custom(existEmail),
    body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage('The password must be at least 8 characters long'),
    body('phone', 'Phone cannot be empty or is not a valid phone')
        .notEmpty()
        .isMobilePhone(),
    validateErrors
]

export const loginValidator = [
    body('userLoggin', 'Username or email cannot be empty')
        .notEmpty()
        .toLowerCase(),    
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isLength({ min: 8 })  
        .withMessage('The password must be at least 8 characters long')
]

//Company
export const saveCompanyValidator = [
    body("name", "Name cannot be empty")
        .notEmpty()
        .custom(existCompanyName),
    body("impactLevel", "Impact Level must be 'Alto', 'Medio', or 'Bajo'")
        .notEmpty()
        .isIn(["Alto", "Medio", "Bajo"]),
    body("yearsExperience", "Years of experience must be a positive number")
        .notEmpty()
        .isInt({ min: 0 })
        .withMessage("Years of experience must be a positive integer"),
    body("category", "Category cannot be empty")
        .notEmpty(),
    validateErrors
]
