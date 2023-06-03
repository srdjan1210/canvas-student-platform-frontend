import React, { useState } from 'react'

export const useDroppableContainer = (callback: (file: File) => void) => {
    const [borderValue, setBorderValue] = useState<string | undefined>()
    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault()
    }

    const handleDragEnter = (event: React.DragEvent) => {
        event.preventDefault()
        if (event.currentTarget !== event.target) return
        setBorderValue('1px dashed gray')
    }

    const handleDragLeave = (event: React.DragEvent) => {
        event.preventDefault()
        if (event.currentTarget !== event.target) return
        setBorderValue(undefined)
    }

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault()
        if (event.currentTarget !== event.target) return
        const files = event.dataTransfer.files
        setBorderValue(undefined)
        callback(files[0])
    }

    return {
        onDragOver: handleDragOver,
        onDragEnter: handleDragEnter,
        onDragLeave: handleDragLeave,
        onDrop: handleDrop,
        border: borderValue,
    }
}
