import { Greeting } from './../../../../types/graph.d'

const resolvers = {
  Query: {
    sayHello: (): Greeting => {
      return {
        error: false,
        text: 'hello'
      }
    }
  }
}

export default resolvers
