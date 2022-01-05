const express = require('express')
const axios = require('axios')
const router = express.Router()
const User = require('../models/User')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
const passport = require('passport');
const Concept = require('../models/Concept');
const Amount = require('../models/Amount');
const { SchemaTypes, Types } = require('mongoose');

const newAmount = async (amount, id) => {
    const amountCreated = new Amount({
        amount,
        concept: id
    })
    const amountSaved = await amountCreated.save()
    if (amountSaved) return amountSaved
    else return "a problem was ocurred"
}


router.post('/create', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {

        try {
            const { concept, amount, date } = req.body
            console.log(req.body, 'body')
            if (err || !user) {

                console.log(info)
                return res.status(400).send({
                    info,
                })
            } else {
                if (concept && amount && date) {


                    let userloaded = await user;
                    let conceptCreated = new Concept({
                        concept,
                        user: userloaded._id,
                        date,
                        amounts: [],
                        total:0,
                        _id: new Types.ObjectId(),


                    })
                    let amountLoaded = await newAmount(amount, conceptCreated._id)
                    console.log()
                    conceptCreated.amounts = [
                        ...conceptCreated.amounts,
                        amountLoaded._id
                    ]
                    
                    const conceptSaved = await conceptCreated.save()
                    let upgradeUser = await User.findById(userloaded._id)
                    console.log(upgradeUser, 'user take it')
                    upgradeUser.concepts = [
                        ...upgradeUser.concepts,
                        conceptSaved._id
                    ]
                    const newUpgradeUser = await upgradeUser.save()
                    if (newUpgradeUser) {

                        return res.send({ msg: "save it sucessfully!", err: false })
                    } else {
                        return res.status(400).send(
                            {
                                msg: "a problem was ocurred trying to save in database",
                                err: true
                            })

                    }
                } else {
                    return res.status(400).send({

                        msg: "there's no enough data",
                        err: true,

                    })
                }
            }
        } catch (err) {
            next(err)
            res.status(404).send(err)
        }
    })(req, res, next)
})

router.post('/addAmount', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {

        try {
            const { amount, id } = req.body
            console.log(req.body, 'body')
            if (err || !user) {

                console.log(info)
                return res.status(400).send({
                    info,
                })
            } else {
                if (amount && id) {
                    let conceptLoaded = await Concept.findById(id)
                    let amountCreated = await newAmount(amount, conceptLoaded._id);
                    conceptLoaded.amounts = [
                        ...conceptLoaded.amounts,
                        amountCreated._id
                    ]
                    let upgradedConcept = await conceptLoaded.save()
                    if (upgradedConcept) {

                        res.send(upgradedConcept)
                    }



                } else {
                    return res.status(400).send({

                        msg: "there's no enough data",
                        err: true,

                    })
                }
            }
        } catch (err) {
            next(err)
            res.status(404).send(err)
        }
    })(req, res, next)
})

router.get('/check', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        try {

            if (err || !user) {

                console.log(info)
                return res.status(400).send({
                    info,
                })
            } else {
                let userloaded = await user;
                console.log(userloaded, 'userloaded')
                User.findById(userloaded._id).
                    populate({
                        path: 'concepts',
                        populate: { path: 'amounts' }
                    }).

                    exec(function (err, userPop) {
                        if (err) return handleError(err);
                        else return res.send(userPop.concepts)
                        // else {
                        //     console.log(userPop.concepts[0].amounts)
                        //     Concept.findById(userPop.concepts[0].amounts).
                        //     populate('amounts').

                        // }
                    })
            }
        } catch (err) {
            next(err)
        }
    })(req, res, next)
})


module.exports = router