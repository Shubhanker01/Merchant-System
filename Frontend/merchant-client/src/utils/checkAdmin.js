import getCookie from "./getCookie"
import decodeToken from "./decodeJwt"
function checkAdmin(participants, admin) {
    let cookie = getCookie()
    let decoded = decodeToken(cookie)
    for (let i = 0; i < participants.length; i++) {
        if (participants[i].email === decoded.email) {
            if (participants[i]._id === admin) {
                return true
            }
        }
    }
    return false
}

export default checkAdmin