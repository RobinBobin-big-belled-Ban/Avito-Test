import React, { FC, useEffect, useState } from 'react'
import { getRepositories, getSearchValue, getCurrantPage } from '../../store/appSlice'
import { useAppSelector, useAppDispatch } from '../../App/hooks'
import debounce from 'lodash/debounce'
import classes from './styles.module.scss'
import CardList from '../CardsList'
import UserPagination from '../UserPagination'
import Spinner from '../Spinner'

interface Props {
}

const RepositoryList: FC<Props> = () => {
    const reposDatas = useAppSelector(store => store.appReducer)
    const {
        items,
        totalCount,
        searchValue,
        isLoading,
        currPage,
        isError,
        errorMsg
    } = reposDatas
    //console.log(storeApp)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (!searchValue && currPage === 1) {
            dispatch(getRepositories({ query: 'js', curPage: 1 }))
        }
    }, [])

    const onSubmitHandler = debounce((event) => {
        event.preventDefault()
        const { value } = event.target
        if (value) {
            dispatch(getRepositories({ query: value, curPage: 1 }))
            dispatch(getCurrantPage(1))
        }
    }, 1200)

    const elements = (
        <>
            <CardList items={items} />
            <UserPagination
                count={totalCount}
                searchValue={searchValue}
                page={currPage}
            />
        </>
    )

    const showLoading = isLoading ? <Spinner /> : null
    const showError = isError ? <div>{errorMsg}</div> : null
    const variantElements = items?.length ? elements : <div>Ничего не найдено...</div>
    const showContent = (!isLoading && !isError) ? variantElements : null

    return (
        <section className={classes.container}>
            <form className={classes.form} onKeyDown={onSubmitHandler}>
                <input
                    className={classes.input}
                    value={searchValue}
                    type="text"
                    onChange={({ target }) => {
                        dispatch(getSearchValue(target.value))
                    }}
                />
            </form>
            {showLoading}
            {showError}
            {showContent}
        </section>
    )
}

export default RepositoryList
