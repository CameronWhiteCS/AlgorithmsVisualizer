import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Container } from 'react-bootstrap'
import Navigation from 'components/Navigation';

import Home from 'components/Home';

import KMeans from 'components/KMeans';

import BubbleSort from 'components/BubbleSort';
import BogoSort from 'components/BogoSort';
import HeapSort from 'components/HeapSort';
import MergeSort from 'components/MergeSort';

import Dijkstra from 'components/Dijkstra';
import AStar from 'components/AStar';

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Switch>

          <Container style={{ marginTop: '10px' }}>
            <Route exact path="/" render={() => { return <Home /> }} />
            <Route exact path="/kmeans" render={() => { return <KMeans /> }} />
            <Route exact path="/bubble" render={() => { return <BubbleSort /> }} />
            <Route exact path="/bogo" render={() => { return <BogoSort /> }} />
            <Route exact path="/heap" render={() => { return <HeapSort /> }} />
            <Route exact path="/merge" render={() => { return <MergeSort /> }} />
            <Route exact path="/dijkstra" render={() => { return <Dijkstra />}} />
            <Route exact path="/astar" render={() => { return <AStar />}} />
          </Container>

        </Switch>
      </BrowserRouter>
    </>

  );

}

export default App;
