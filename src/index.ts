import dotenv from 'dotenv'
import { Options } from 'graphql-yoga'
import { createConnection } from 'typeorm'
import app from './app'
import connectionOptions from './ormConfig'

dotenv.config()

const PORT: string | number = process.env.PORT || 4000
const PLAYGROUND: string = '/playground'
const GRAPHQL_ENDPOINT: string = '/graphql'

const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND,
  endpoint: GRAPHQL_ENDPOINT
}

createConnection(connectionOptions)
  .then(() => {
    app.start(appOptions, () => console.log(`Server is running on ${PORT}`))
  })
  .catch(err => console.log('Error Connecting to PostgreSQL: ', err))
