import React, { useState } from 'react';

import iHelpAPI from '../services/api';

const ForgotPass = (p) => {

    const api = iHelpAPI();
    const [email, setEmail] = useState('');

    async function handleSendEmail(e) {
        e.preventDefault();

        api.post('/forgotPassword', {
            email: email
        }).then((response) => {

            if (response.status === 200) {

                p.app.notify(
                    'success', 
                    'E-mail de recuperação enviado, ' +
                    'favor verificar sua caixa de entrada, SPAM e lixo eletrônico.', 
                    5
                );
                
                p.history.push('/');

            } else {
                p.app.notify('warning', response.data, 2);
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
                                    <h4 className="main-title mb-1">Esqueci minha senha</h4>
                                </div>
                            </div>

                            <form className="needs-validation" noValidate="" onSubmit={handleSendEmail}>

                                <div className="row">
                                    <div className="col-md mb-3">
                                        <label htmlFor="nome">E-mail</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required={true}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md mb-3">
                                        <label htmlFor="btn-send-email"></label>
                                        <button
                                            type="submit"
                                            id="btn-send-email"
                                            className="btn btn-primary btn-lg btn-block"
                                        >Enviar e-mail de recuperação</button>
                                    </div>
                                </div>                                

                            </form>

                        </div>

                    </div>

                </div>

                {(!p.admin) 
                    ? <footer className="my-5 pt-5 text-muted text-center text-small">
                        <p className="mb-1">© 2020 Oxedev</p>
                      </footer>
                    : null
                }

            </div>


        </div>
    );
}

export default ForgotPass;