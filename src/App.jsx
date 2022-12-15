import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, Wallet, NotFound } from './services/PagesExport';
import { Footer } from './services/ComponentsExport';

class App extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/carteira" component={ Wallet } />
          <Route component={ NotFound } />
        </Switch>
        <Footer />
      </>
    );
  }
}

export default App;
