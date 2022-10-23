import express from 'express'
const cors = require('cors')
import { tasksRoutes } from './routes/tasks.routes'
const app = express()
app.use(cors())
app.listen(3333)
app.use(express.json())

app.use("/tasks", tasksRoutes)