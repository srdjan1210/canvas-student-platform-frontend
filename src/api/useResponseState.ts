import { useState } from 'react'
import { ResponseState } from './response-state'

export const useResponseState = <T>(defaultState: ResponseState<T>) => {
    const [state, setState] = useState<ResponseState<T>>(defaultState)

    const setLoading = () => {
        setState({
            ...state,
            status: 'LOADING',
        })
    }

    const setSuccess = (data?: T) => {
        setState({
            ...state,
            status: 'SUCCESS',
            data,
        })
    }

    const setError = (error: string | null = null) => {
        setState({
            ...state,
            status: 'ERROR',
            error,
        })
    }

    return {
        state,
        setState,
        setLoading,
        setError,
        setSuccess,
    }
}
