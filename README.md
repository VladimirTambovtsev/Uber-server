# Uber-server
TypeScript, GraphQL-Yoga, PostgreSQL, TypeORM, Twilio, Mailgun API

### Start

```bash
echo "
PORT=
JWT_TOKEN=
DOMAIN=
DB_ENDPOINT=
DB_USERNAME=
DB_PASSWORD=
TWILIO_TOKEN=
TWILIO_SID=
TWILIO_PHONE=
MAILGUN_API_KEY=
MAILGUN_DOMAIN=
" >> .env
```
Gen GraphQL Typescript types and run hot-reload
```node
yarn && yarn pretypes && yarn predev && yarn dev
```
