import Company from './company.model.js'

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
        console.error(err);
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
        console.error(err);
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
        console.error(err);
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}