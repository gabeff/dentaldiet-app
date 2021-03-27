import React, { useState } from 'react';

import iHelpAPI from '../services/api';

const ChangePass = (p) => {

    const api = iHelpAPI();
    const [changePassword, setChangePassword] = useState({
        password: '',
        pass_confirmation: '',
        error: ''
    });

    //atualizar senha
    const modifyPassword = e => {

        setChangePassword({
            ...changePassword,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {

        e.preventDefault();

        const token = p.match.params.token;

        api.post('/changePassword', {
            params: {token: token, newpass: changePassword.pass_confirmation}
        }).then((response) => {

            if (response.status === 200) {

                p.app.notify(
                    'success', 
                    'Senha alterada com sucesso!', 
                    5
                );

                p.history.push('/');

            } else {
                p.app.notify('warning', response.data.error, 2);
            }
        }).catch((err) => {
            console.error(err);
            p.app.notify('danger', err.response.data.error, 2);
        });
    }

    return (
        <div>

            <div className="main-container">

                <div className="container">

                    <div className="row">

                        {/* Dados do Usuário */}
                        <div className="col-md">

                            <div className="row">
                                <div className="col-md-8 mb-3">
                                    <h4 className="main-title mb-1">Alterar senha</h4>
                                </div>
                            </div>

                            <form className="needs-validation" noValidate="" onSubmit={handleSubmit}>

                                <div className="row">
                                    <div className="col mb-3">
                                        <label htmlFor="new_password">Senha</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            value={changePassword.password}
                                            onChange={modifyPassword}
                                            autoComplete="password"
                                            required={true}
                                        />
                                    </div>
                                    <div className="col mb-3">
                                        <label htmlFor="pass_confirmation">Confirmação da senha</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="pass_confirmation"
                                            value={changePassword.pass_confirmation}
                                            onChange={modifyPassword}
                                            autoComplete="pass_confirmation"
                                            required={true}
                                        />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        {(changePassword.password !== '' && changePassword.pass_confirmation !== '')
                                            ? ((changePassword.password === changePassword.pass_confirmation)
                                                ? (<span style={{
                                                    width: '100%',
                                                    marginTop: '.25rem',
                                                    fontSize: '80%',
                                                    color: '#29a73e'
                                                }}>
                                                    As senhas coincidem
                                                    </span>)
                                                : (<span style={{
                                                    width: '100%',
                                                    marginTop: '.25rem',
                                                    fontSize: '80%',
                                                    color: '#dc3545'
                                                }}>
                                                    As senhas devem coincidir
                                                    </span>))
                                            : null}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md mb-3">
                                        <label htmlFor="btn-save-user"></label>
                                        <button
                                            type="submit"
                                            disabled={(changePassword.password === '' 
                                                || changePassword.pass_confirmation === '' 
                                                || changePassword.password !== changePassword.pass_confirmation)
                                            }
                                            id="btn-save-user"
                                            className="btn btn-primary btn-lg btn-block"
                                        >Alterar senha</button>
                                    </div>
                                </div>                                

                            </form>

                        </div>

                    </div>

                </div>

                <footer className="my-5 pt-5 text-muted text-center text-small">
                  <p className="mb-1">© 2020 Oxedev</p>
                </footer>

            </div>


        </div>
    );
}

export default ChangePass;