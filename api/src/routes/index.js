const express = require('express')

const { Router } = require('express');
const userRoute = require ('./UserRoute')
const conceptRouter = require('./ConceptRouter')
const router = express.Router()


router.use('/u',userRoute)
router.use('/concept', conceptRouter)
module.exports = router