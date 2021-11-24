require('./db')
const mongoose = require('mongoose');
const User = require('../src/models/User')
const express = require('express')
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const routes = require('./routes/index')
const cors = require('cors');
const session = require('express-session')
const passMiddleWare = require('./passport')
const passport = require('passport')
const passportLocal = require('passport-local').Strategy


require('dotenv').config();
const {
   SECRET
} = process.env;


const server = express()
server.name = 'API'
server.use(cors());
server.use(cors({origin: true, credentials: true}));

server.use(morgan('dev'));
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(cookieParser(SECRET));
// server.use(session({
//   secret:SECRET,
//   resave:true,
//   saveUninitialized:true,
// }))
server.use(passport.initialize())
passport.use(passMiddleWare)



// server.use(passport.session())

// passport.use(new passportLocal((username,password,done) => {
//    if ( username === 'tinastossel' && password == '12345'){
//      return done(null,{id:1,name:'Tina'})
//     }
//     done(null,false)
// }))
// //{id:1,name:'Tina'}
// //1 =>  Serialización
// passport.serializeUser((user,done)=>{
//   done(null,user.id)
// })
// // Deserialización
// passport.deserializeUser((id,done)=>{
//   done(null,{id:1,name:'Tina'})
// })


server.use('/',routes )
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
  });


  

module.exports = server 