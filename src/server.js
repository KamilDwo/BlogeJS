const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')

app.use(cors())
app.use(express.static('api'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
