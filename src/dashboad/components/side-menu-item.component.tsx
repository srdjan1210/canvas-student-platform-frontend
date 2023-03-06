import { Flex, Text, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'

export interface Props {
    action?: () => void
    tooltip: string
    link?: string
    icon?: any
}

export const SideMenuItem = ({ tooltip, icon, link, action }: Props) => {
    return (
        <Flex
            className={'side-menu-item'}
            w={'100%'}
            alignItems={'center'}
            justifyContent={'center'}
        >
            <Tooltip label={tooltip}>
                {action ? (
                    <Flex onClick={action}>{icon}</Flex>
                ) : (
                    <NavLink to={link ?? ''}>{icon}</NavLink>
                )}
            </Tooltip>
        </Flex>
    )
}
