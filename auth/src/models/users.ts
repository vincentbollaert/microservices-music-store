import mongoose from 'mongoose'
import { Password } from '../services/password'

interface IUser {
  email: string;
  password: string;
}
// for all fields that would be present (incl those added by mongoose)
interface IUserDocument extends mongoose.Document {
  email: string;
  password: string;
}
interface IUserModel extends mongoose.Model<IUserDocument> {
  build(params: IUser): IUserDocument
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
}, {
  // let's you map the response
  // should be moved to V layer
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id
      delete ret._id
      delete ret.password
      delete ret.__v
    }
  }
})

// with mongoose, you need to call done after await due to older implementations
// should this not be 'next'? it's a middleware fn no?
userSchema.pre('save', async function(done) {
  // password is modified if new (create user) or updated (edit user password)
  if (this.isModified('password')) {
    const hashedPassword = await Password.toHash(this.get('password'))
    this.set('password', hashedPassword)
  }
  done()
})

// NOTES
// typechecking the creating of new users is problematic
// as `new UserModel({ email, password })` doesn't get typechecked
// a possible solution is to return `new UserModel inside a fn: 
// // - const newUserModel = (params: IUser) => new UserModel(params)
// now you need to export that as well though
// tbh I'd create a utility fn for that, but alternatively add the method directly to the schema
// which requires extending the Model and all these generics :/\
userSchema.statics.build = (params: IUser) => new UserModel(params)

export const UserModel = mongoose.model<IUserDocument, IUserModel>('User', userSchema)
