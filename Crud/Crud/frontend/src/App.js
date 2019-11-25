import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Incluir from './pages/contatos/incluir';
import Pesquisar from './pages/contatos/pesquisar';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">Agenda Digital</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={'/'} className="nav-link">início</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/Incluir'} className="nav-link">Cadastrar/Atualizar Contato</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/Listar'} className="nav-link">Listar Contatos</Link>
                </li>
              </ul>
            </div>
          </nav> <br />
          <Switch>
            <Route exact path='/incluir' component={Incluir} />
            <Route path='/listar' component={Pesquisar} />
          </Switch>
        </div>
        
      </Router>
    );
  }
}

export default App;