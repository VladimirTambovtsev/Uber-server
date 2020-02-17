import User from '../../../../entities/User'
import {
  EmailSignInMutationArgs,
  EmailSignInResponse
} from './../../../../types/graph.d'
import { Resolvers } from './../../../../types/resolvers.d'

const resolvers: Resolvers = {
  Mutation: {
    EmailSignIn: async (
      _,
      args: EmailSignInMutationArgs
    ): Promise<EmailSignInResponse> => {
      const { email, password } = args
      try {
        const user = await User.findOne({ email })
        if (!user) {
          return {
            ok: false,
            error: 'No user found with this email',
            token: null
          }
        }
        const checkPassword = await user.comparePassword(password)
        if (checkPassword) {
          return {
            ok: true,
            error: null,
            token: 'Coming soon'
          }
        } else {
          return {
            ok: false,
            error: null,
            token: 'Wrong password'
          }
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        }
      }
    }
  }
}

export default resolvers
