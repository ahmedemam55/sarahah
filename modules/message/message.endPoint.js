const { Roles } = require("../../midlwear/auth");



const endPoint =  {
    deleteMessage :[Roles.Admin , Roles.User]
}


module.exports = endPoint