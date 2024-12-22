const crypto = require('crypto')

const generatePassword = () => {
    return crypto.randomBytes(16).toString('hex')
}

module.exports = generatePassword