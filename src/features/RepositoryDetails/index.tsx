import React, { FC } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../App/hooks'
import classes from './styles.module.scss'
import Card from '../../components/Card'
import Image from '../../components/Image'
import format from 'date-fns/format'

interface Props { }

interface UsePar {
    id: string;
}

const RepositoryDetails: FC<Props> = () => {
    const repositoryId: UsePar = useParams()
    const history = useHistory()
    const reposDatas = useAppSelector(store => store.appReducer)
    const { items } = reposDatas

    const [singleRepository] = items.filter(item => item.id === +repositoryId.id)
    //console.log(singleRepository)
    if (singleRepository) {
        const { description, pushed_at, name, owner, language } = singleRepository
        const { avatar_url, login, type, html_url } = owner
        const formatedData = format(new Date(pushed_at), 'dd-MMMM-yyyy')
        return (
            <section className={classes.container}>
                <button
                    className={classes.button}
                    onClick={() => history.push('/')}
                >
                    Вернуться назад
                </button>
                <Card
                    title={name}
                    bordered
                    className={classes.card}
                >
                    <p>Краткое описание {description}</p>
                    <p>Основной язык {language}</p>
                    <p>Дата создания {formatedData}</p>
                </Card>
                <div className={classes['image-container']}>
                    <Image
                        src={avatar_url}
                        width={200}
                        height={200}
                        fallback={'./mini_1.jpg'}
                    />
                    <Card
                        title={login}
                        bordered
                        className={classes.card}
                    >
                        <p>Тип профиля автора {type}</p>
                        <p><a href={html_url} target="_blank">{name}</a></p>
                    </Card>
                </div>
            </section>
        )
    }
    return (
        <Link to="/" >Данные не обнаружены.....</Link>
    )
}

export default RepositoryDetails
