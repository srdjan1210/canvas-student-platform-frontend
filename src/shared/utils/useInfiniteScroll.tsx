import { useEffect, useState } from 'react'
export type InfiniteScrollOptions = {
    isLoading?: boolean
    triggerAtMounted?: boolean
    atHeight?: number
    temporaryDisable?: boolean
    cooldown?: number
}

export const useInfiniteScroll = (
    callback: () => Promise<void> | Promise<boolean> | void | boolean,
    {
        isLoading = false,
        triggerAtMounted = false,
        temporaryDisable = false,
        atHeight = 10,
        cooldown = 2000,
    }: InfiniteScrollOptions
) => {
    const [isOnCooldown, setIsOnCooldown] = useState(false)
    const [page, setPage] = useState(1)

    const nextPage = () => {
        setPage(page + 1)
    }

    const resetPages = () => {
        setPage(1)
    }

    const execute = async () => {
        if (isLoading || isOnCooldown || temporaryDisable) return
        setIsOnCooldown(true)
        const shouldLoadNextPage = await callback()
        nextPage()
        setTimeout(() => {
            setIsOnCooldown(!shouldLoadNextPage)
        }, cooldown)
    }

    useEffect(() => {
        if (triggerAtMounted) execute()
    }, [])

    const onScroll = (e: any) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target
        if (scrollTop + clientHeight + atHeight >= scrollHeight) {
            execute()
        }
    }

    return { onScroll, nextPage, page, isOnCooldown, resetPages }
}
