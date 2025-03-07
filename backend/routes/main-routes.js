const express = require('express')
const router = express.Router()

const formData = require('../controller/contactForm').formData;


router.post('/api', formData)


module.exports = router;