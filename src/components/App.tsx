import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import MovieDetail from './MovieDetail';
import Movies from './Movies';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          {/* Home/Movies page */}
          <Route exact path="/">
            <Movies />
          </Route>
          {/* Movie detail page */}
          <Route path="/:id" children={<MovieDetail />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
