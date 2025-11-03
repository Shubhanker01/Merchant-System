// writing function wrapper for toast loading
import { toast } from 'react-toastify'

export const loadingWrapper = () => {
    const toastId = toast.loading("Processing...", { position: 'top-center' })
    return toastId
}