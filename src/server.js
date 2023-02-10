import express from 'express'
import { initDb, seed, dropAll } from './db/index.js'
import { v1 } from './routes.v1.js'
import { v2 } from './routes.v2.js'

const app = express()

initDb().then( async () => {
    console.log('mongo connected')
    // await dropAll()
    // await seed(10, 100)
}).catch( err => {
    console.log('something went wront connecting to mongo = ', err)
})

app.get('/health', (req, res) => {
    res.status(200).json({ success: true })
})

app.use('/v1', v1)
app.use('/v2', v2)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`)
})