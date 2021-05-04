import React, { FC, useState } from 'react'
import Pagination from '../../components/Pagination'
import 'antd/dist/antd.css'
import { getRepositories, getCurrantPage } from '../../store/appSlice'
import { useAppSelector, useAppDispatch } from '../../App/hooks'
import classes from './styles.module.scss'

interface Props {
    count: number | null;
    searchValue: string;
    page: number;
}

const UserPagination: FC<Props> = ({ count, searchValue, page }) => {
    const dispatch = useAppDispatch()
    const totalCount = (count && count > 100) ? 100 : count
    return (
        <Pagination
            current={page}
            className={classes.pagination}
            size="small"
            total={totalCount ? totalCount : undefined}
            showSizeChanger={false}
            onChange={page => {
                dispatch(getRepositories({
                    query: searchValue ? searchValue : 'ruby',
                    curPage: page
                }))
                dispatch(getCurrantPage(page))
            }}
        />
    )
}

export default UserPagination