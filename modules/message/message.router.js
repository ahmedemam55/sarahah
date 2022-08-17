const router = require('express').Router()
const message = require("./controller/message")
const {validation} = require("../../midlwear/validation")
const { sendMessage, deleteMessage } = require('./message.validation')
const { auth } = require('../../midlwear/auth')
const endPoint = require('./message.endPoint')



router.post("/message/:id" , validation(sendMessage) ,message.sendMessage )

router.delete("/message/:id" ,  validation(deleteMessage) , auth(endPoint.deleteMessage) , message.deletMessage)












module.exports = router