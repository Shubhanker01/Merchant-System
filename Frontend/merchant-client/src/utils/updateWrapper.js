// update wrapper to show success and error messages
import { toast } from 'react-toastify'

export const updateWrapper = (toastId, type, message) => {
    if (type === 'success') {
        toast.update(toastId, { render: message, type: "success", isLoading: false, autoClose: 3000, position: 'top-center' })
    }
    else {
        toast.update(toastId, { render: message, type: "error", isLoading: false, autoClose: 3000, position: 'top-center' })
    }
}