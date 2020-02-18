import User from '../../../../entities/User'
import { Resolvers } from '../../../../types/resolvers'
import privateResolver from '../../../../utils/privateResolver'
import { UpdateMyProfileResponse } from './../../../../types/graph.d'

const resolvers: Resolvers = {
  Mutation: {
    ToggleDrivingMode: privateResolver(
      async (_, __, { req }): Promise<UpdateMyProfileResponse> => {
        const user: User = req.User
        user.isDriving = !user.isDriving
        user.save()
        return { ok: true, error: null }
      }
    )
  }
}

export default resolvers
