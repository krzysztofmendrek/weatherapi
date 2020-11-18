import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import SearchView from './Components/SearchView/SearchView';
import ForecastView from './Components/ForecastView/ForecastView';

function App() {
  return (
    <>
      <Router>
        <main>
          <section className='weather-info'>
            <SearchView />
            <Switch>
              <Route path='/search/:city'>
                <ForecastView />
              </Route>
            </Switch>
          </section>
        </main>
      </Router>
    </>
  );
}

export default App;
