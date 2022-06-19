import { Schema, model } from 'mongoose'

interface User {
  email: string
  code: string | null
  refreshTokens: { refreshToken: string; expirationDate: number }[]

  createdAt: number
  updatedAt: number
}

const refreshTokenSchema = new Schema(
  {
    refreshToken: { type: String, required: true },
    expirationDate: { type: Date, required: true },
  },
  { _id: false }
)

const userSchema = new Schema<User>(
  {
    email: { type: String, required: true, lowercase: true, unique: true, dropDups: true },
    code: { type: String },
    refreshTokens: [refreshTokenSchema],
  },
  {
    timestamps: true,
  }
)

const userModel = model('User', userSchema)

export default userModel
