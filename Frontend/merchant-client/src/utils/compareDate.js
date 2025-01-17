export default function compareDate(openingDate, closingDate) {
    let date1 = Date.parse(openingDate)
    let date2 = Date.parse(closingDate)
    if (date1 > date2) {
        return false
    }
    return true
} 