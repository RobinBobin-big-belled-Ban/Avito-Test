import React, { FC } from 'react'
import { Spin as SpinAntd } from 'antd'
import { SpinProps } from 'antd/lib/spin'

interface Props extends SpinProps { }

const Spin: FC<Props> = ({ ...props }) => {
    return <SpinAntd {...props} />
}

export default Spin