const { Roles } = require("../../midlwear/auth");


const endPoint ={
    profile : [Roles.Admin , Roles.User , Roles.Hr],
    delete : [Roles.Admin],
    profileMessages : [ Roles.User , Roles.Admin]
}

module.exports = endPoint