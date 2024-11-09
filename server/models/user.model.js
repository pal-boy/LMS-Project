import { Schema , model } from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    fullname: {
        type: String,
        required:[true , "Name is required"],
        minLength: [3 , "fullname must be atleast 3 characters long"],
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required:[true , "Email is required"],
        lowercase: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required:[true , "Password is required"],
        select: false
    },
    avatar: {
        public_id: {
            type: String
        },
        secure_url: {
            type: String
        }
    },
    role: {
        type: String,
        enum: ['USER','ADMIN'],
        default: 'USER'
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date
},{timestamps: true});

userSchema.pre('save',async function(next){
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
})

const User = model("User", userSchema);

export default User;