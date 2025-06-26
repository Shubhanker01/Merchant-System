const noOfUnreadMessages = (groupName, otherMessages) => {
    if (otherMessages.length == 0) return 0
    let index = otherMessages.findIndex((group) => group.groupName == groupName)
    if (index == -1) {
        return 0
    }
    return otherMessages[index].noOfMessages
}

export default noOfUnreadMessages