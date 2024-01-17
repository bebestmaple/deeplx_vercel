import { Hono } from 'hono'
import { query } from '@ifyour/deeplx'
import { serve } from '@hono/node-server'

const app = new Hono()

app
  .get('/', (c) => c.text("OK"))
  .get('/7d89775882674d9781eea0035a4bf3ef/translate', (c) => c.text('Please use POST method :)'))
  .post('/7d89775882674d9781eea0035a4bf3ef/translate', async (c) => {
    const params = await c.req.json().catch(() => ({}))
    const result = await query(params)
    return c.json(result, result.code)
  })

serve(app)
