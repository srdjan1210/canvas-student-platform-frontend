import { Box, BoxProps } from '@chakra-ui/react'
import { Children } from '../types'

export interface Props {
    onDragStart: (e: React.DragEvent) => void
    onDrop: (e: React.DragEvent, data: any) => void
    children: Children
}

export const DndTwoWayContainer = ({
    children,
    onDragStart,
    onDrop,
    ...props
}: Props & BoxProps) => {
    return (
        <Box {...props} draggable onDragStart={onDragStart} onDrop={onDrop}>
            {children}
        </Box>
    )
}
