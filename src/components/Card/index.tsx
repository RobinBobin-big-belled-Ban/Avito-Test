import React, { FC } from 'react'
import { Card as CardAntd } from 'antd'
import { CardProps } from 'antd/lib/card'

interface Props extends CardProps { }

const Card: FC<Props> = ({ ...props }) => {
    return <CardAntd {...props} />
}

export default Card