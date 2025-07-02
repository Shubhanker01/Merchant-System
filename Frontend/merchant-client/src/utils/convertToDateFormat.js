export default function convertToDateFormat(date) {
    const dateArr = date.split("-")
    // check if the month is in single digit then add zero
    if (dateArr[1].length == 1) {
        dateArr[1] = "0" + dateArr[1]
    }
    // check if the day is in single digit then add zero
    if (dateArr[2].length == 1) {
        dateArr[2] = "0" + dateArr[2]
    }
    const newFormatedDate = dateArr.reverse().join("-")
    return newFormatedDate
}