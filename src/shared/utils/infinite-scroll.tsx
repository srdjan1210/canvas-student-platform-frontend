import { useRef, useState } from 'react'

export const useInfiniteScroll = (callback: () => void, atHeight = 10) => {
    const [loading, setLoading] = useState(false)
    const onScroll = (e: any) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target
        if (scrollTop + clientHeight + atHeight >= scrollHeight) {
            if (loading) return
            setLoading(true)
            callback()
        }
    }

    return { onScroll, setLoading }
}
