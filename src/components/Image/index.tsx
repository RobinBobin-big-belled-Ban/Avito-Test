import React, { FC } from 'react'
import { Image as ImageAntd } from 'antd'
import { ImageProps } from 'antd/lib/image'

interface Props extends ImageProps { }

const Image: FC<Props> = ({ ...props }) => {
    return <ImageAntd {...props} />
}

export default Image