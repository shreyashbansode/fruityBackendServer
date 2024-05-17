const express = require('express');
const app = express();
const conn = require('./db');
const cors = require('cors')
const env = require('dotenv/config')

const PORT = process.env.PORT || 5500

conn.connection.on('connected', (err) => {
    if (err) {
        console.log('error while connecting database')
    } else {
        console.log('database connected successfully')
    }
})

app.use(express.json());
app.use(cors());
app.use('/user', require('./routes/user'))
app.use('/product', require('./routes/product'))
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log('server is listen ', PORT)
})

