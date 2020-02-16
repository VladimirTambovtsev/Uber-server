import { Options } from 'graphql-yoga'
import app from './app'

const PORT: string | number = process.env.PORT || 4000
const PLAYGROUND: string = '/playground'
const GRAPHQL_ENDPOINT: string = '/graphql'

const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND,
  endpoint: GRAPHQL_ENDPOINT
}

app.start(appOptions, () => console.log(`Server is running on ${PORT}`))
