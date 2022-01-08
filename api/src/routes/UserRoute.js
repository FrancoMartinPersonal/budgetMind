const express = require('express')
const axios = require('axios')
const router = express.Router()
const User = require('../models/User')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
const passport = require('passport')
//const fetch = require('node-fetch') 
require('dotenv').config();
const {
    SECRET
} = process.env;

function createToken(user) {
    return jwt.sign({
        id: user._id,
        email: user.email
    }, SECRET)
}

async function loginFun(req, res) {
    var { user, mail, password } = req.body

    console.log({ user, mail, password }, 'body after transformation LOGIN')
    if ((user.length > 1 || mail.length > 1) && password.length > 1) {
        userInfoUser = await User.findOne({
            user,
        })
        userInfoEmail = await User.findOne({
            mail,
        })
        // console.log(userInfoUser,'userInfoUser', userInfoEmail, 'userInfoEmail')
        if (userInfoUser || userInfoEmail) {
            let passHash = (userInfoUser || userInfoEmail).password
            compare = await bcryptjs.compare(password, passHash)
            if (compare) {

                res.status(200).json({
                    token: createToken(userInfoUser || userInfoEmail),
                    msg: undefined
                })
            } else {
                res.status(400).send({
                    msg: 'the password is wrong'
                })

            }
        } else {
            res.status(404).send({
                msg: 'the mail or username is incorrect'
            })
        }
    } else {
        res.status(400).send({ msg: 'there is no info' })
    }
    userInfoUser, userInfoEmail = undefined
}

router.get('/validate', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        try {

            if (err || !user) {

                console.log(info)
                return res.status(400).send({
                    info,
                    auth: false
                })
            } else {
                console.log(info)

                let userloaded = await user

                console.log(userloaded)
                return res.send({
                    login: {
                        user: userloaded.user,
                        mail: userloaded.mail,
                        date: userloaded.date,
                        id: userloaded._id,
                    },
                    auth: true
                })
            }
        } catch (err) {
            next(err)
        }
    })(req, res, next)
})


router.post('/login', async (req, res, next) => {
    try {
        loginFun(req, res)

    } catch (err) {
        next(err)
        res.status(404).send(err)
    }
})
router.post('/register', async (req, res, next) => {
    try {

        console.log(req.body)
        const { user, mail, password, password2 } = req.body
        if (user && mail && password && password2) {

            let errors
            if (user.length > 19 || user.length < 4) {
                errors = 'the username must be between 4 and 19 characters'
                console.log(user.length)
            }
            if (mail.length < 8) {
                errors = 'insert a valid mail'
            }
            if (!mail.includes('@')) {
                errors = 'the mail must contain @ '
            }
            if (password !== password2) {
                errors = 'the password must be the same'
            } if (password.length < 4 || password.length > 30) {
                errors = 'the password must be between 6 and 30 characters'
            }
            if (user.length == 0 || mail.length == 0 || password.length == 0 || password2.length == 0) {
                errors = 'fields are missing'
            }
            if (errors) {
                res.status(404).send({

                    msg: errors

                })
            }else{


                const userRes = await User.findOne({
                    user
                })
                const mailRes = await User.findOne({
                    mail
                })

                if (userRes) {

                    res.status(404).send({

                        msg: 'the user is already register'

                    })

                } else if (mailRes) {
                    res.status(404).send({

                        msg: 'the mail is already register'

                    })
                }
                else {

                    let passhash = await bcryptjs.hash(password.toString(), 10)

                    const usera = new User({
                        user: user,
                        mail: mail,
                        password: passhash
                    })
                    console.log(passhash)
                    const userSaved = await usera.save()
                    console.log(userSaved)
                    loginFun(req, res)
                    //compare = await bcryptjs.compare(password,userSaved.password)



                }
            }
        } else {
            res.status(404).send({

                msg: 'theres no data'

            })
        }


    } catch (err) {
        next(err)
        res.status(404).send(err)
    }
})

router.get('/users', async (req, res, next) => {
    try {
        const users = await User.find()

        res.send(users)
    } catch (err) {
        next(err)
        res.status(404).send(err)
    }

})
router.get('/user/:id', async (req, res, next) => {
    try {
        const idUser = req.params.id
        console.log(idUser, 'id user')
        const user = await User.findOne({
            _id: idUser
        })
        if (user) {
            res.send(user)


        } else {

            res.status(404).send({ msg: 'user not found' })

        }
    } catch (err) {
        next(err)
        res.status(404).send(err)
    }
})

// async function user(){
//     const usera = new User({
//         name:'dedo jajua',
//         user:'ded',
//         mail: 'dedo@a2a.com',
//         password: 'sdasd23'
//     })

//     const userSaved = await usera.save()
//    console.log(userSaved)
// }

// user().then(us => console.log(us)).catch(err => console.log(err))
module.exports = router