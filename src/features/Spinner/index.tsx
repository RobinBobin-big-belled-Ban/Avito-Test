import React, { FC } from 'react'
import Spin from '../../components/Spin'
import Space from '../../components/Space'
import classes from './styles.module.scss'

const Spinner: FC = () => {
    return (
        <div className={classes.space}>
            <Space size="middle">
                <Spin size="small" />
                <Spin />
                <Spin size="large" />
            </Space>
        </div>
    )
}

export default Spinner
