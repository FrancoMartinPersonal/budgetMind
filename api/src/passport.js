const  { Strategy, ExtractJwt, StrategyOptions } = require('passport-jwt') 
const  User = require ('./models/User')
require('dotenv').config();
const {
    SECRET
} = process.env;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET,

}

module.exports = new Strategy(opts, async (payload, done) => {
    const user = await User.findById(payload.id)
    try {
        if (user) {
            return done(null, user)
        }
        else {
            return done(null, false)
        }
    } catch (error) {
        console.log(error)
    }
})