const express = require('express')

const { Router } = require('express');
const userRoute = require ('./UserRoute')

const router = express.Router()


router.use('/u',userRoute)

module.exports = router