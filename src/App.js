import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom';
import routes from './routing/routing';
import Navbar from './components/navbar/navbar';


class App extends React.Component {

  render() {
    return (
      <Router>
      <Navbar />
        <Switch>
          {
            routes.map(({path , component }) => {
              return(
                <Route
                  exact
                  path={path}
                  component={component}
                  key={Math.random()}
                />
              )
            })
          }
        </Switch>
      </Router>
    );
  }
}

export default App;
