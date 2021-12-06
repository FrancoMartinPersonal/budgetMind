const express = require('express')
const axios = require('axios')
const router = express.Router()
const User = require('../models/User')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
const passport = require('passport')

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
router.get('/validate', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.send('success')
})


router.post('/login', async (req, res, next) => {
    try {
        var { username, mail, password } = req.body
       
        if (mail.includes('@')||username.includes('@')) {
            mail = username
            username = ""

        } else if (!mail.includes('@')||!username.includes('@')) {
            username = mail
            mail = ""
        }
        // console.log({username,mail,password}, 'body after transformation LOGIN')
        if ((username.length > 1 || mail.length > 1) && password.length > 1) {
             userInfoUser = await User.findOne({
                user:username,
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
        userInfoUser,userInfoEmail=undefined

    } catch (err) {
        next(err)
        res.status(404).send(err)
    }
})
router.post('/register', async (req, res, next) => {
    try {

        console.log(req.body)
        const { fullname, user, mail, password } = req.body
        if (fullname && user && mail && password) {
            const userRes = await User.findOne({
                user
            })
            const mailRes = await User.findOne({
                mail
            })

            if (userRes || mailRes) {

                res.send({ msg: 'el usuario y/o mail ya están regitrados' })
            } else {

                let passhash = await bcryptjs.hash(password.toString(), 10)

                const usera = new User({
                    name: fullname,
                    user: user,
                    mail: mail,
                    password: passhash
                })
                console.log(passhash)
                const userSaved = await usera.save()
                res.send(userSaved)


            }
        } else {
            res.status(404).send({ msg: 'no hay datos!' })
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

            res.status(404).send({ msg: 'no se ha encontrado el usuario' })

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