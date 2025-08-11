const express = require('express');
const cors = require('cors');
require('dotenv').config();
const testRoute = require('./routes/testRoute');

const app = express()
app.use(cors())
app.use(express.json())

app.use('/', testRoute)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));