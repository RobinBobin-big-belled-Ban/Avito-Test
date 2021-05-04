import React, { FC, useEffect } from 'react'
import RepositoryList from '../features/RepositoriesList'
import RepositoryDetails from '../features/RepositoryDetails'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import classes from './styles.module.scss'

interface Props {

}

const App: FC<Props> = () => {
  return (
    <BrowserRouter>
      <section className={classes.container}>
        <Switch>
          <Route path="/" component={RepositoryList} exact />
          <Route path="/:id" component={RepositoryDetails} />
        </Switch>
      </section>
    </BrowserRouter>
  );
}

export default App;
