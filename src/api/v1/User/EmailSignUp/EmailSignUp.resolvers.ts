import { sendVerificationEmail } from './../../../../utils/sendEmail'
import User from '../../../../entities/User'
import Verification from '../../../../entities/Verification'
import createJWT from '../../../../utils/createJWT'
import {
  EmailSignUpMutationArgs,
  EmailSignUpResponse
} from './../../../../types/graph.d'
import { Resolvers } from './../../../../types/resolvers.d'

const resolvers: Resolvers = {
  Mutation: {
    EmailSignUp: async (
      _,
      args: EmailSignUpMutationArgs
    ): Promise<EmailSignUpResponse> => {
      const { email } = args
      try {
        const existingUser = await User.findOne({ email })

        // @descr: User exists
        if (existingUser) {
          return { ok: false, error: 'You should log in instead', token: null }
        } else {
          const phoneVerification = await Verification.findOne({
            payload: args.phoneNumber,
            verified: true
          })

          // @descr: Phone verified
          if (phoneVerification) {
            const newUser = await User.create({
              ...args
            }).save()

            // @descr: Email verification
            if (newUser.email) {
              const emailVerification = await Verification.create({
                payload: newUser.email,
                target: 'EMAIL'
              })
              await sendVerificationEmail(
                newUser.fullName,
                emailVerification.key
              )
            }
            const token = createJWT(newUser.id)
            return { ok: true, error: null, token }
          } else {
            return {
              ok: false,
              error: "You haven't verified your phone number",
              token: null
            }
          }
        }
      } catch (error) {
        return { ok: true, error: error.message, token: null }
      }
    }
  }
}

export default resolvers
