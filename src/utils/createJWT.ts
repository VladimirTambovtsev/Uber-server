import { config } from 'dotenv'
import jwt from 'jsonwebtoken'
import { resolve } from 'path'
config({ path: resolve(__dirname, '../../.env') })

const JWT_TOKEN = process.env.JWT_TOKEN || 'nTtYqnK3yf3CFnxJPMnGjts2TTgLeggg'

const createJWT = (id: number): string => {
  const token = jwt.sign({ id }, JWT_TOKEN)
  return token
}

export default createJWT
