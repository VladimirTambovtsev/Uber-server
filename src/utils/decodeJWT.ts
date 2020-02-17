import jwt from 'jsonwebtoken'
import User from '../entities/User'

const JWT_TOKEN = process.env.JWT_TOKEN || 'nTtYqnK3yf3CFnxJPMnGjts2TTgLeggg'

const decodeJWT = async (token: string): Promise<User | undefined> => {
  try {
    const decoded: any = jwt.verify(token, JWT_TOKEN)
    const { id } = decoded
    const user = await User.findOne({ id })
    return user
  } catch (error) {
    return undefined
  }
}

export default decodeJWT
