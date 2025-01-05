const crypto = require('crypto')

const generatePassword = () => {
    return crypto.randomBytes(8).toString('hex')
}

module.exports = generatePassword