const mongoose = require('mongoose');
const User = require('../src/models/User')
require('dotenv').config();
const {
    DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;
const {} = require('./models/User')
const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/test?retryWrites=true&w=majority`


async function main() {
    await mongoose.connect(uri);
}


main()
// console.log(usera)


module.exports= {
    uri
}

// const kittySchema = new mongoose.Schema({
//     name: String
// })

// const Kitten = mongoose.model('Kitten', kittySchema)

// const silence = new Kitten({ name: 'Silence' });
// console.log(silence.name); // 'Silence'