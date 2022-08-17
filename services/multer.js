const multer = require('multer');
const path = require('path')
const { nanoid } = require('nanoid')
console.log(path.join(__dirname, '../uploads'));
const fs = require('fs')
// require("../uploads")
function myMulter(customPath) {
    if (!customPath || customPath == null) {
        customPath = 'generalFolder'
    }
    if (!fs.existsSync(path.join(__dirname, `../uploads/${customPath}`))) {
        fs.mkdirSync(path.join(__dirname, `../uploads/${customPath}`) , { recursive: true })
    }
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            req.destinationFile = `uploads/${customPath}`
            cb(null, path.join(__dirname, `../uploads/${customPath}`))
        },
        filename: function (req, file, cb) {
            console.log({ file });
            const fullFileName = nanoid() + "_" + file.originalname
            cb(null, fullFileName)

        }
    })

    const fileFilter = function (req, file, cb) {
        if (file.mimetype == 'image/jpeg' ||
            file.mimetype == 'image/png' ||
            file.mimetype == 'image/jpg') {

            cb(null, true)

        } else {
            req.imageError = true
            cb(null, false, req.imageError)
        }

    }

    const upload = multer({ dest: path.join(__dirname, `../uploads/${customPath}`), fileFilter, storage })
    return upload
}


module.exports = myMulter