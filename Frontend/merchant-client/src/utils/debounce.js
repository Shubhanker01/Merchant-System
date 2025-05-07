function debounce(cb, delay = 2000) {
    let timeout
    return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            console.log(...args)
            cb(...args)
        }, delay)
    }
}

export default debounce