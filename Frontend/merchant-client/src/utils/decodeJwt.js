import { jwtDecode } from 'jwt-decode'
function decodeToken(token) {
    const decoded = jwtDecode(token)
    return decoded
}

export default decodeToken