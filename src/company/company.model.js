import { model, Schema } from "mongoose"

const companySchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            unique: true  
        },
        impactLevel: {
            type: String,
            enum: ['Alto', 'Medio', 'Bajo'],
            required: [true, 'Impact Level is required']
        },
        yearsExperience: {
            type: Number,
            required: [true, 'Years experience is required']
        },
        category: {
            type: String,
            required: [true, 'Category is required']
        }
    }
)

export default model('Company', companySchema)