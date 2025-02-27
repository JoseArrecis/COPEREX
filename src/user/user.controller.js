import User from './user.model.js'
import argon2 from 'argon2'
import mongoose from 'mongoose'

export const addClient = async(req, res)=>{
    try {
        const { name, surname, username, email, password, phone } = req.body

        const existingUser = await User.findOne({ $or: [{ username }, { email }] })
        if (existingUser) {
            return res.status(400).send({
                message: 'User with this username or email already exists'
            })
        }

        const hashedPassword = await argon2.hash(password)

        const newUser = new User({
            name,
            surname,
            username,
            email,
            password: hashedPassword,
            phone,
            role: 'USER'
        })

        await newUser.save()

        res.status(201).send({
            message: 'Client registered successfully',
            newUser
        })

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

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).send(
                {
                    success: false,
                    message: 'Invalid user ID'
                }
            )
        }

        const { name, surname, username, email, phone, profilePicture, role } = req.body
        const requestingUser = req.user
        const userToUpdate = await User.findById(id)

        if (!userToUpdate) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'User not found'
                }
            )
        }

        if (userToUpdate.role === 'ADMIN' && role === 'CLIENT') {
            return res.status(403).send(
                {
                    success: false,
                    message: 'You cannot downgrade an ADMIN to CLIENT'
                }
            )
        }

        const updateUser = await User.findByIdAndUpdate(
            id,
            { name, surname, username, email, phone, profilePicture, role },
            { new: true }
        )

        return res.send(
            {
                success: true,
                message: 'User updated',
                updateUser
            }
        )

    } catch (err) {
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

export const deleteOne = async (req, res) => {
    try {
        const userId = req.params.id

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send(
                {
                    success: false,
                    message: "Invalid user ID",
                }
            )
        }

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).send(
                {
                    success: false,
                    message: "User not found",
                }
            )
        }

        user.status = false
        await user.save()

        return res.send(
            {
                success: true,
                message: "User desactivated",
            }
        )

    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: "General error",
                err
            }
        )
    }
}