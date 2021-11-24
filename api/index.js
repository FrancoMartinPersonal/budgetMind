const mongoose = require('mongoose');
const {uri} = require('./src/db')
const server = require('./src/app')
require('dotenv').config();
const {
    YOUR_PORT
} = process.env;

mongoose.connection.on('open', _ => {
    console.log('Database is connected to ', uri)
    server.listen(YOUR_PORT,() => {
        console.log('%s listening at '+YOUR_PORT)  
    })
})

mongoose.connection.on('error', _ => {
    console.error('Database launched an error in ', uri)
})

