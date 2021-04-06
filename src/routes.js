import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import DentaldietContext from './DentaldietContext';

import Login from './pages/Login';
import ForgotPass from './pages/ForgotPass';
import ChangePass from './pages/ChangePass';

import Cadastrar from './pages/Usuario/Cadastrar';
import Perfil from './pages/Usuario/Perfil';
import Diario from './pages/Usuario/Diario';
import Calendario from './pages/Usuario/Calendario';
import Orientacoes from './pages/Usuario/Orientacoes';

import Users from './pages/Admin/Users';

import Menu from './layout/Menu';

const NavRoute = ({p, user, exact, path, component: Component}) => (
    (user) 
    ?   <Route exact={exact} path={path} render={(props) => (
            <div>
                <Menu {...props} app={p}/>
                <Component {...props} app={p}/>
                <footer className="footer text-muted text-center text-small">
                    <p className="mb-1">© 2020 Oxedev</p>
                </footer>
            </div>
        )}/>
    :   <Redirect
            to={{
                pathname: '/'
            }}
        />
)

class Routes extends React.Component {

    render() {    
        return (
            <DentaldietContext.Consumer>
                {app => (
                    <BrowserRouter>
                        <Switch>
                            <Route path="/" exact render={(props) => <Login {...props} app={this.props} />} />
                            <Route path="/Confirm/:id" render={(props) => <Login {...props} app={this.props}/>} />
                            <Route path="/Usuario/Cadastrar" render={(props) => <Cadastrar {...props} app={this.props} />} />
                            <Route path="/EsqueciMinhaSenha" render={(props) => <ForgotPass {...props} app={this.props}/>} />
                            <Route path= "/AlterarSenha/:token" render={(props) => <ChangePass {...props} app={this.props}/>} />
                            <NavRoute p={this.props} user={app.user} exact path="/Usuario/Perfil" component={Perfil}/>
                            <NavRoute p={this.props} user={app.user} exact path="/Usuario/Diario" component={Diario}/>
                            <NavRoute p={this.props} user={app.user} exact path="/Usuario/Calendario" component={Calendario}/>
                            <NavRoute p={this.props} user={app.user} exact path="/Usuario/Orientacoes" component={Orientacoes}/>
                            <NavRoute p={this.props} user={app.user} exact path="/Admin/Users" component={Users}/>
                        </Switch>
                    </BrowserRouter>
                )}
            </DentaldietContext.Consumer>
        );
    }
}

export default Routes;