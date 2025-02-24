import User from '../user/user.model.js'

export const register = async(req, res)=>{
    try {
        let data = req.body

        let user = new User(data)
        user.password = await encrypt(user.password)

        user.role = data.role || 'ADMIN'

        await user.save()
        return res.send(
            {
                message: `Registered succesfully, you can log with username: ${user.username}`
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                message: 'General error with registering user',
                err
            }
        )
    }
}


export const login = async(req, res)=>{
    try {
        let { userLoggin, password } = req.body
        let user = await User.findOne(
            {
                $or: [
                    {email: userLoggin},
                    {username: userLoggin}
                ]
            }
        )

    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                message: 'General error with login function'
            }
        )
    }
}