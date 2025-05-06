function checkParticipantDuplicate(currParticipants, addedParticipants) {
    for (let i = 0; i < currParticipants.length; i++) {
        for (let j = 0; j < addedParticipants.length; j++) {
            if (currParticipants[i]._id === addedParticipants[j].id) {
                return true
            }
        }
    }
    return false
}

export default checkParticipantDuplicate