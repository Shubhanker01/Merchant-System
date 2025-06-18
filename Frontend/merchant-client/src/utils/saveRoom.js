export default function saveRooms(addedRooms) {
    let room = []
    console.log(addedRooms)
    room.push(...addedRooms)
    const rooms = localStorage.getItem('rooms')
    // if user is in none of the rooms
    if (!rooms) {
        localStorage.setItem('rooms', JSON.stringify(room))
    }
    // user may be part of some rooms
    else {
        let savedRooms = JSON.parse(localStorage.getItem('rooms'))
        savedRooms.push(...room)
        localStorage.setItem('rooms', JSON.stringify(savedRooms))
    }
}