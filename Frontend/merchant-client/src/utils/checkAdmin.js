
function checkAdmin(participants, admin) {
    for (let i = 0; i < participants.length; i++) {
        if (participants[i]._id === admin) {
            return true
        }
    }
    return false
}

export default checkAdmin