import { useEffect, useState } from 'react'

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        const id = setTimeout(() => {
            console.log("timeout started")
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(id)
            console.log("timeout ended")
        }
    }, [value, delay])

    return debouncedValue
}

export default useDebounce