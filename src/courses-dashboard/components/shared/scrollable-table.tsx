import { Flex, FlexProps, Table, TableProps } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import { SCROLL_HOVER_DEFAULT } from '../../../shared/utils/utils'

export interface Props {
    flexProps?: FlexProps
}
export const ScrollableTable = ({
    children,
    ...flexProps
}: PropsWithChildren & Props & TableProps) => (
    <Flex
        overflowY={'scroll'}
        maxH={'400px'}
        css={{ ...SCROLL_HOVER_DEFAULT }}
        p={'5px'}
        {...flexProps}
    >
        <Table
            css={{
                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;',
                tableLayout: 'fixed',
            }}
        >
            {children}
        </Table>
    </Flex>
)
