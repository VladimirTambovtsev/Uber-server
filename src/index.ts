import { config } from 'dotenv'
import { Options } from 'graphql-yoga'
import { resolve } from 'path'
import { createConnection } from 'typeorm'
import app from './app'
import connectionOptions from './ormConfig'
import decodeJWT from './utils/decodeJWT'

config({ path: resolve(__dirname, '../.env') })

const PORT: string | number = process.env.PORT || 4000
const PLAYGROUND: string = '/playground'
const GRAPHQL_ENDPOINT: string = '/graphql'
const SUBSCRIPTION_ENDPOINT: string = '/subscription'

const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND,
  endpoint: GRAPHQL_ENDPOINT,
  subscriptions: {
    path: SUBSCRIPTION_ENDPOINT,
    onConnect: async connectionParams => {
      const token = connectionParams['X-JWT']
      if (token) {
        const user = await decodeJWT(token)
        if (user) {
          return { currentUser: user }
        }
      }
      throw new Error("No JWT. Can't suscribe")
    }
  }
}

createConnection(connectionOptions)
  .then(() => {
    app.start(appOptions, () => console.log(`Server is running on ${PORT}`))
  })
  .catch(err => console.log('Error Connecting to PostgreSQL: ', err))
