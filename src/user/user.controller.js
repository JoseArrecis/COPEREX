import User from './user.model.js'
import argon2 from 'argon2'

export const addClient = async(req, res)=>{
    try {
        const { name, surname, username, email, password, phone } = req.body;

        // Verificamos si ya existe un usuario con el mismo username o email
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).send({
                message: 'User with this username or email already exists'
            });
        }

        // Ciframos la contraseña antes de guardarla
        const hashedPassword = await argon2.hash(password);

        // Creamos el nuevo usuario sin el campo "role"
        const newUser = new User({
            name,
            surname,
            username,
            email,
            password: hashedPassword,
            phone,
            role: 'USER'
        });

        // Guardamos el cliente en la base de datos
        await newUser.save();

        // Respondemos con un mensaje de éxito
        res.status(201).send({
            message: 'Client registered successfully',
            newUser
        });

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