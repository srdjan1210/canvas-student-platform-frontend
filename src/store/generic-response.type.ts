export type GenericResponseType<T> = {
    data: T | null
    error: string | null
}
