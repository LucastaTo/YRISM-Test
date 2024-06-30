// toastService.ts

import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { get as _get, has } from 'lodash-es';

// Define toast options
const toastOptions: ToastOptions = {
    autoClose: 3000,
    className: 'custom-toast'
};

// Function to display error toast
function displayErrorToast(error: any, duration: number = 3000): void {
    let message = '';

    if (typeof error === 'string') {
        message = error;
    } else if (error && has(error, 'data.message')) {
        message = error.data.message;
    } else if (error && error.response) {
        message = _get(error.response, 'data.message') || error.message;
    } else if (error && error.request) {
        message = 'Network error';
    } else {
        message = error.message || 'Unknown error';
    }

    toast.error(message, {
        autoClose: duration,
        // Add other toast options if needed
    });
}

// Function to display success toast
function displaySuccessToast(success: any, duration: number = 3000): void {
    const message = typeof success === 'string' ? success :
        success.response ? (_get(success.response, 'data.message') || success.message) :
        success.request ? 'Network error' :
        success.message;

    toast.success(message, {
        ...toastOptions,
        autoClose: duration
    });
}

// ToastInstance class to manage toast instances
class ToastInstance {
    private toastId: number | string | null = null;

    showToast = (type: 'success' | 'error', message: string, duration: number = 3000): void => {
        if (!this.toastId) {
            this.toastId = type === 'success' ?
                toast.success(message, {
                    ...toastOptions,
                    autoClose: duration
                }) :
                toast.error(message, {
                    ...toastOptions,
                    autoClose: duration
                });
        } else {
            toast.update(this.toastId, {
                render: message,
                autoClose: duration
            });
        }
    };
}

// Exporting singleton instances
const toastInstance = new ToastInstance();

export const toastSuccess = (message: string, duration: number = 3000): void => toastInstance.showToast('success', message, duration);
export const toastError = (message: string, duration: number = 3000): void => toastInstance.showToast('error', message, duration);
export { displayErrorToast, displaySuccessToast };
