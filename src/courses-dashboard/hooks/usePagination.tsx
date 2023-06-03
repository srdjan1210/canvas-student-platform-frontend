import { useState } from 'react'

export const usePagination = () => {
    const [page, setPage] = useState(1)
    const limit = 10
    const next = () => setPage(page + 1)
    const previous = () => setPage(page >= 1 ? page - 1 : 1)
    const reset = () => setPage(1)
    return {
        page,
        setPage,
        next,
        previous,
        reset,
        limit,
    }
}
