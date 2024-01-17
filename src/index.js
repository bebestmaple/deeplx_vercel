import { Hono } from 'hono'
import { query } from '@ifyour/deeplx'
import { serve } from '@hono/node-server'

const  path_guid = process.env.PATH_GUID;
const translate_path =  path_guid ? `/${path_guid}/translate` : "/translate";
const app = new Hono()

app
  .get('/', (c) => c.text("OK"))
  .get(translate_path, (c) => c.text('Please use POST method :)'))
  .post(translate_path, async (c) => {
    const params = await c.req.json().catch(() => ({}))
    const result = await query(params)
    return c.json(result, result.code)
  })

serve(app)
