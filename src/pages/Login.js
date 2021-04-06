import React, { useEffect, useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import './Login.css';

import DentaldietApi from '../services/api';
import logo from '../assets/logo.png';
import logo192 from '../assets/logo192.png';

const Login = (p) => {

    const isMedium = useMediaQuery('(max-width: 1072px)');
    const [user, setUser] = useState({
        email: '',
        password: '',
        confirmed: false
    });
    const [msgErro, setMsgErro] = useState({ error: '' });
    const api = DentaldietApi;
    const [serverUP, setServerUP] = useState(false);

    async function checkServerUP() {

        await api.get('/', {timeout: 1000}).then((response) => {
            if (response.status === 200) {
                setServerUP(true);
                return;
            } else {
                setServerUP(false);
            }
        }).catch((err) => {
            console.error(err);
            setServerUP(false);
        });
    }

    useEffect(() => {

        checkServerUP();

        if (p.app.state.user) {
            p.history.push('/Usuario/Diario');
        }

        if (p.match.path === '/Confirm/:id' && !user.confirmed) {
            confirmEmail(p.match.params.id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [p]);

    const updateUser = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();

        await checkServerUP();

        if (!serverUP) {
            p.app.notify('danger', 'Servidor inacessível no momento, favor tentar novamente em alguns instantes.', 2);
            return false;
        }

        api.post('/login', {
            email: user.email,
            password: user.password
        }).then((response) => {
            if (response.status === 200) {
                const { token, user } = response.data;

                if (token !== null) {

                    p.app.setCookie('token', token);
                    localStorage.setItem('@dentaldiet/access', token);
                    p.app.setCookie('user', user);

                     p.history.push('/Usuario/Diario');
                }
            } else {
                const error = new Error(response.error);
                throw error;
            }
        }).catch((err) => {
            console.error(err);
            setMsgErro(err.response.data);
        });
    }

    function registerUser() {
        p.history.push('/Usuario/Cadastrar');
    }

    function confirmEmail(id) {
        api.get(`/email/confirm/${id}`).then((response, err) => {

            if (response.status === 200) {
                p.app.notify('success', response.data.message, 2);
                user.confirmed = true;
                
            } else {
                const error = new Error(response.error);
                throw error;
            }

        }).catch((err) => {
            p.app.notify('warning', err.response.data.error, 2);
        });
    }

    return (
        <div className="login-container">

            <div className="wide-container h-100">

                <div className="row h-100 align-items-center">

                    <div className={`col-lg-6 pb-4 h-100 ${isMedium ? 'order-last' : 'order-first'}`} style={{background: '#fff'}}>
                        <div className="row h-100">
                        <div className="col-10 offset-1 my-auto" style={{textAlign: 'center'}}>

                            <img src={logo192} alt='Dental Diet' style={{height: '192px', width: '192px', marginTop: '20px', marginBottom: '20px'}}/>

                            <br/>
                            <Typography variant="body1">
                                Neste aplicativo, você irá identificar os alimentos, bebidas e suplementos que apresentam risco 
                                para o desenvolvimento de cárie e erosão dentária.
                            </Typography>
                            <br/><br/>
                            <Typography variant="body1">
                            Após o registro do diário alimentar, os alimentos em destaque serão identificados e, em seguida, 
                            você receberá algumas dicas em saúde bucal.
                            </Typography>
                            <br/><br/>
                            <Typography variant="subtitle2">
                            Mas atenção! Este aplicativo não substitui a consulta odontológica ou outros cuidados em saúde 
                            que necessitem de um profissional. 
                            </Typography>
                            <br/><br/>
                            <Typography variant="h6" component="h6">
                            Seja bem vindo ao Dental Diet!
                            </Typography>
                        </div>
                        </div>
                    </div>

                    <div className={`col-lg-6 mt-4 mb-4 ${isMedium ? 'order-first' : 'order-last'}`}>
                        <div className="col-8 offset-2">
                            <img src={logo} alt='Dental Diet'/>

                            <Paper style={{marginTop: '20px'}}>
                                <form onSubmit={handleSubmit}>
                                    <input
                                        placeholder="Digite seu e-mail"
                                        type="email"
                                        name="email"
                                        value={user.email}
                                        onChange={updateUser}
                                    />
                                    <input
                                        placeholder="Digite sua senha"
                                        type="password"
                                        name="password"
                                        value={user.password}
                                        onChange={updateUser}
                                    />

                                    <span style={{
                                        width: '100%',
                                        marginTop: '.25rem',
                                        fontSize: '80%',
                                        color: '#dc3545'
                                    }}>
                                        {msgErro.error}
                                    </span>

                                    <button type="submit">Entrar</button>
                                    <span style={{width: '100%', marginTop: '0.25rem', fontSize: '80%'}}>
                                        <a href="/EsqueciMinhaSenha">Esqueceu sua senha?</a>
                                    </span>
                                    <br/>

                                    <Divider/>

                                    <button type="button" className="register-button" onClick={registerUser}>
                                        Cadastrar-se
                                    </button>
                                </form>
                            </Paper>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;