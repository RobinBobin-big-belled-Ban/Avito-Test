import React, { FC } from 'react'
import { Space as SpaceAntd } from 'antd'
import { SpaceProps } from 'antd/lib/space'

interface Props extends SpaceProps { }

const Space: FC<Props> = ({ ...props }) => {
    return <SpaceAntd {...props} />
}

export default Space
