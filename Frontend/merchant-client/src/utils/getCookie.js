export default function getCookie() {
    let cookie = document.cookie
    let cookieArray = cookie.split(';')
    let token = ''
    for (let i = 0; i < cookieArray.length; i++) {
        if (cookieArray[i].includes('token')) {
            token = cookieArray[i].split("=")[1]
        }
    }
    return token
}