const express = require('express')
const axios = require('axios')
const router = express.Router()
const User = require('../models/User')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
const passport = require('passport');
const Concept = require('../models/Concept');


router.post('/create', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {

        try {
            const { concept, amount } = req.body
            console.log(req.body, 'body')
            if (err || !user) {

                console.log(info)
                return res.status(400).send({
                    info,
                })
            } else {
                if (concept && amount) {

                    let userloaded = await user;
                    const conceptCreated = new Concept({
                        concept,
                        amount,
                        user: userloaded._id

                    })
                    const conceptSaved = await conceptCreated.save()
                    let upgradeUser = await User.findById(userloaded._id)
                    console.log(upgradeUser, 'user take it')
                    upgradeUser.concepts = [
                        ...upgradeUser.concepts,
                        conceptSaved._id
                    ]
                    const newUpgradeUser = await upgradeUser.save()
                    return res.send({conceptSaved, newUpgradeUser})
                }else {
                    return res.status(400).send({
                        info:{
                            message:"there's no enough data"
                        }
                    })
                }
            }
        } catch (err) {
            next(err)
            res.status(404).send(err)
        }
    })(req, res, next)
})

router.get('/check',(req,res,next)=>{
    passport.authenticate('jwt',{session:false},async (err,user,info) =>{
        try{
            
            if (err || !user) {
     
               console.log(info)
                return res.status(400).send({
                    info,
                })
            } else {
                let userloaded = await user;
                console.log(userloaded,'userloaded')
                 User.findById(userloaded._id).
                populate('concepts').
                exec(function(err,story){
                    if (err) return handleError(err);
                    return res.send(story)
                })
            }
        }catch(err){
            next(err)
        }
    })(req,res,next)
})


module.exports = router