import React from 'react';

import './Menu.css';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import DateRangeIcon from '@material-ui/icons/DateRange';
import InfoIcon from '@material-ui/icons/Info';
import logo from '../assets/logo-min.svg'

class Main extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            userPath: "",
            diarioPath: "",
            calendPath: "",
            tipsPath: "",
        }

        this.logout = this.logout.bind(this);
        this.goToSettings = this.goToSettings.bind(this);
        this.goToCalendario = this.goToCalendario.bind(this);
        this.goToDiario = this.goToDiario.bind(this);
        this.goToOrientacoes = this.goToOrientacoes.bind(this);
        this.updatePath = this.updatePath.bind(this);
    }

    componentDidMount(){

        const pathname = this.props.history.location.pathname;

        if (pathname.includes('/Usuario/Perfil')) {
            this.setState({
                userPath: "active"
            });
        } else if (pathname.includes('/Usuario/Calendario')) {
            this.setState({
                calendPath: "active"
            });
        } else if (pathname.includes('/Usuario/Diario')) {
            this.setState({
                diarioPath: "active"
            });
        } else if (pathname.includes('/Usuario/Orientacoes')) {
            this.setState({
                tipsPath: "active"
            });
        } 
    }

    logout() {

        this.props.app.removeCookie('user');
        this.props.history.push('/');
        window.location.reload();
    }

    updatePath(path) {

        this.setState({
            userPath: "",
            diarioPath: "",
            calendPath: "",
            tipsPath: ""
        });

        this.setState({
            [path]: "active"
        })
    }

    goToCalendario() {
        this.props.history.push('/Usuario/Calendario');
        this.updatePath('calendPath');
    }

    goToDiario() {
        this.props.history.push('/Usuario/Diario');
        this.updatePath('diarioPath');
    }

    goToSettings() {
        this.props.history.push('/Usuario/Perfil');
        this.updatePath('userPath');
    }

    goToOrientacoes() {
        this.props.history.push('/Usuario/Orientacoes');
        this.updatePath('tipsPath');
    }

    render() {
        return (
            <div>
                <nav className="navbar fixed-top navbar-expand-lg navbar-light">
                    <a className="navbar-brand" href="/">
                        <div className="menu-icons"><img src={logo} alt='iHelp'/></div>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#textoNavbar" aria-controls="textoNavbar" aria-expanded="false" aria-label="Alterna navegação">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="textoNavbar">
                        <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <div className={`menu-icons ${this.state.userPath}`}>
                                <button onClick={() => {this.goToSettings()}} type="button" data-toggle="collapse" data-target="#textoNavbar">
                                    <AccountCircleIcon className="menu-icon icon-settings"/> Perfil
                                </button>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className={`menu-icons ${this.state.diarioPath}`}>
                                <button onClick={() => {this.goToDiario()}} type="button" data-toggle="collapse" data-target="#textoNavbar">
                                    <NoteAddIcon className="menu-icon"/> Diário Alimentar
                                </button>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className={`menu-icons ${this.state.calendPath}`}>
                                <button onClick={() => {this.goToCalendario()}} type="button" data-toggle="collapse" data-target="#textoNavbar">
                                    <DateRangeIcon className="menu-icon"/> Calendário
                                </button>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className={`menu-icons ${this.state.tipsPath}`}>
                                <button onClick={() => {this.goToOrientacoes()}} type="button" data-toggle="collapse" data-target="#textoNavbar">
                                    <InfoIcon className="menu-icon"/> Orientações
                                </button>
                            </div>
                        </li>
                        </ul>
                         <span className="navbar-text">
                            <div className="menu-icons">
                                <button onClick={() => {this.logout()}}>
                                    <ExitToAppIcon className="menu-icon"/> Sair
                                </button>
                            </div>
                        </span>
                    </div>
                </nav>                          
            </div>
        );
    }
}


export default Main;