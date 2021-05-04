import React, { FC } from 'react'
import classes from './styles.module.scss'
import { Items } from '../../store/appSlice'
import Card from '../../components/Card'
import { Link } from 'react-router-dom'
import format from 'date-fns/format'

interface Props {
    items: Items[];
}

const CardList: FC<Props> = ({ items }) => {
    return (
        <div className={classes['card-list']}>
            {
                items.map((elem: Items) => {
                    const { name, id, stargazers_count, pushed_at, git_url } = elem
                    const formatedData = format(new Date(pushed_at), 'dd-MMMM-yyyy')
                    const gitUrl = git_url.replace('git:', 'http:')
                    return <Card
                        key={id}
                        className={classes.card}
                        title={<h3>
                            <Link
                                className={classes.title}
                                to={`/${id}`}>{name}
                            </Link>
                        </h3>}
                        bordered
                    >
                        <p>Кол-во звезд на GitHub {stargazers_count}</p>
                        <p>Дата последнего коммита {formatedData}</p>
                        <p>Cсылка на Github <a
                            href={gitUrl} target="_blank">{git_url}</a>
                        </p>
                    </Card>
                })
            }
        </div>
    )
}

export default CardList
