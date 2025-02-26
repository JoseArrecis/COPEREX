import Company from './company.model.js'
import ExcelJS from 'exceljs'

export const registerCompany = async(req, res)=>{
    try {
        const { name, impactLevel, yearsExperience, category } = req.body

        const existingCompany = await Company.findOne({ name })
        if(existingCompany) return res.status(400).send(
            {
                message: 'Company already exists'
            }
        )

        const newCompany = new Company({ name, impactLevel, yearsExperience, category })
        await newCompany.save()

        res.status(201).send(
            {
                message: 'Company registered succesfylly',
                newCompany
            }
        )

    }catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}

export const getCompanies = async(req, res)=>{
    try {
        let { sort, filter, value } = req.query
        let query = {}

        if(filter && value){
            query[filter] = isNaN(value) ? value : Number(value)
        }

        let sortQuery = { name: 1 }
        if (sort === 'Z-A') sortQuery = { name: -1 }
        if(sort === 'experience') sortQuery = { yearsExperience: -1 }

        let companies = await Company.find(query).sort(sortQuery)

        res.json(companies)
    }catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}

export const updateCompany = async(req, res)=>{
    try {
        const { id } = req.params
        const { name, impactLevel, yearsExperience, category } = req.body
        
        const updateCompany = await Company.findByIdAndUpdate(
            id,
            { name, impactLevel, yearsExperience, category },
            { new: true, runValidators: true }
        )

        if(!updateCompany) return res.status(404).json({ message: 'Company not found' })
        
        res.json(
            { 
                message: 'Company updated successfully',
                updateCompany
            }
        )
    }catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}

export const generateReport = async(req, res) =>{
    try {
        const companies = await Company.find()

        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet('Companies Report')
    
        worksheet.columns = [
          { header: 'Company Name', key: 'name', width: 30 },
          { header: 'Impact Level', key: 'impactLevel', width: 15 },
          { header: 'Years of Experience', key: 'yearsExperience', width: 20 },
          { header: 'Category', key: 'category', width: 20 },
          { header: 'Created At', key: 'createdAt', width: 25 }
        ]
    
        companies.forEach((company) => {
          worksheet.addRow({
            name: company.name,
            impactLevel: company.impactLevel,
            yearsExperience: company.yearsExperience,
            category: company.category,
            createdAt: company.createdAt.toISOString().split('T')[0] // Formato YYYY-MM-DD
          })
        })
    
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        res.setHeader('Content-Disposition', 'attachment; filename="companies_report.xlsx"')
    
        await workbook.xlsx.write(res)
        res.end()
    }catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}