import User from '../../../../entities/User'
import {
  FacebookConnectMutationArgs,
  FacebookConnectResponse
} from './../../../../types/graph.d'
import { Resolvers } from './../../../../types/resolvers.d'

const resolvers: Resolvers = {
  Mutation: {
    FacebookConnect: async (
      _,
      args: FacebookConnectMutationArgs
    ): Promise<FacebookConnectResponse> => {
      const { facebookId } = args
      try {
        const existingUser = await User.findOne({ facebookId })
        if (existingUser) {
          return {
            ok: true,
            error: null,
            token: 'Coming sooon, already exists'
          }
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        }
      }

      try {
        const newUser = await User.create({
          ...args,
          profilePhoto: `http://graph.facebook.com/${facebookId}/picture?type=square`
        }).save()
        return {
          ok: true,
          error: null,
          token: 'Coming soon, created'
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
