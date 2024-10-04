import { Hono } from 'hono'
import voice from './routes/voice'
const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route("/api/voice", voice)

export default app
