import mongoose from 'mongoose'

interface IUser {
  email: string;
  password: string;
}
const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: [true, 'must have email']
  },
  password: {
    type: String,
    required: [true, 'must have password']
  }
})

export const UserModel = mongoose.model('User', userSchema)
export const newUserModel = (params: IUser) => new UserModel(params) // wrap in fn for type checking
