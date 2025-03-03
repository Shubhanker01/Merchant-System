function checkDuplicate(user, id) {
    for (let i = 0; i < user.length; i++) {
        if (user[i].id === id) {
            return true
        }
    }
    return false
}
export default checkDuplicate