const mongoose = require('mongoose')
const bycrpt = require('bcrypt')
const { array } = require('joi')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
    ,
    password: {
        type: String,
        required: true
    },
    age: Number,
    phone: String,
    profilePic: String,
    coverPic: Array,
    loginStatus: { type: Boolean, default: false },
    lastseen: { type: String },
    confirmEmail: { type: Boolean, default: false },
    role: { type: String, default: 'User' },
}, {
    timestamps: true
})


userSchema.pre('save', async function (next) {
    this.password = await bycrpt.hash(this.password, parseInt(process.env.saltRound))
    next()
})
userSchema.pre("findOneAndUpdate", async function () {
    console.log(this.model);
    console.log(this.getQuery());
    const hookData = await this.model.findOne(this.getQuery()).select("__v");
    console.log(hookData);
    this.set({ __v: hookData.__v + 1 })
})


const cryptoJs = require("crypto-js")
userSchema.post("findOne", function (result) {
    result.phone = cryptoJs.AES.decrypt(result.phone, 'secret key 123').toString(cryptoJs.enc.Utf8)
})

const userModel = mongoose.model('User', userSchema)
module.exports = userModel