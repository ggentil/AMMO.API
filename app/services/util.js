module.exports = class Util {

    constructor(){}

    throwDefaultResponse(success, message, data) {
        return {
            success: success,
            message: message,
            data: data
        }
    }
}