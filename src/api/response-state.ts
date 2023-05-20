export type ResponseState<T> = {
    data: T | undefined
    error: string | null
    status: 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'
}
