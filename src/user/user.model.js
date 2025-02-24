import { model, Schema } from "mongoose";

const userSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLength: [25, `Can't be overcome 25 characters`]
        },
        surname: {
            type: String,
            required: [true, 'Surname is required'],
            maxLength: [25, `Can't be overcome 25 characters`]
        },
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
            maxLength: [50, `Can't be overcome 50 characters`]
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Email is required']
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: [8, 'Password must be 8 characters'],
            maxLength: [16, 'Password must be 16 characters']
        },
        phone: {
            type: String,
            required: [true, 'Phone is required'],
            minLength: [8, 'Phone must be 8 characters'],
            maxLength: [13, `Can´t be overcome 13 numbers`] 
        },
        role: {
            type: String,
            required: [true, 'Role is required'],
            uppercase: true,
            enum: ['ADMIN']
        },
        status: {
            type: Boolean,
            default: true
        }
    }
)

userSchema.methods.toJSON = function(){
    const { __v, password, _id, ...user } = this.toObject()
    user.uid = _id
    return user
}

export default model('User', userSchema)