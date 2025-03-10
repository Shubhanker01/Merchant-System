import decodeToken from "./decodeJwt";
import getCookie from "./getCookie";

function checkAdmin(email) {
    let cookie = getCookie()
    let decode = decodeToken(cookie)
    if (decode.email === email) {
        return true
    }
    return false
}

export default checkAdmin