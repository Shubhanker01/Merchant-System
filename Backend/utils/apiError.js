class apiError extends Error {
    constructor(statusCode, message, error=[], stack=''){
        super(message)
        this.statusCode = statusCode
        this.error = error
        this.stack = stack
    }
}

module.exports = apiError