import React, { useState } from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from 'date-fns/locale/pt-BR';
import 'moment/locale/pt-br';

import dentaldietApi from '../../services/api';

import PrivacidadeDialog from './PrivacidadeDialog';
import TermosDialog from './TermosDialog';

registerLocale('pt-BR', ptBR);

const Cadastrar = (p) => {

    const api = dentaldietApi(p.app.state.token);

    const [user, setUser] = useState({
        email: '',
        nome: '',
        atleta: 'N',
    });
    const [changePassword, setChangePassword] = useState({
        password: '',
        pass_confirmation: '',
        error: ''
    });
    const [openPrivacidade, setOpenPrivacidade] = useState(false);
    const [openTermos, setOpenTermos] = useState(false);
    const [termos, setTermos] = useState(false);
    const currentYear = new Date().getFullYear();
    const years = Array.from(new Array(121), (x, i) => currentYear - i);
    const months = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
    ];

    //atualiza dados do usuário 
    const modifyUser = e => {

        console.log(e.target);
        
        let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value; 
        if (e.target.type === 'number') value = value.replace(',', '.');

        setUser({
            ...user,
            [e.target.name]: value,
        });
    }

    //atualiza termos
    const modifyTermos = e => {

        setTermos(e.target.checked);
    }

    //atualizar senha
    const modifyPassword = e => {

        setChangePassword({
            ...changePassword,
            [e.target.name]: e.target.value,
        });
    }

    async function handleUserRegistration(e) {
        e.preventDefault();

        user.password = changePassword.pass_confirmation;
        user.nascimento = p.app.state.dateDiario;

        api.post('/registerUser', {
            user
        }).then((response) => {
            if (response.status === 200) {
                p.app.notify('success', 'Usuário cadastrado com sucesso, verifique seu e-mail para confirmação.', 2);
                (p.admin) ? p.handleCloseAddUser() : p.history.push('/');
            } else {
                p.app.notify('warning', response.data, 2);
            }
        }).catch((err) => {
            console.error(err);
            p.app.notify('danger', err.response.data, 2);
        });
    }

    function closePrivacidade() {
        setOpenPrivacidade(false);
    }

    function closeTermos() {
        setOpenTermos(false);
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
                                    <h4 className="mb-1">Cadastro do Usuário</h4>
                                </div>
                            </div>

                            <form className="needs-validation" noValidate="" onSubmit={handleUserRegistration}>

                                <div className="row">
                                    <div className="col-md mb-3">
                                        <label htmlFor="nome">E-mail</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={user.email}
                                            onChange={modifyUser}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md mb-3">
                                        <label htmlFor="nome">Nome</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="nome"
                                            value={user.nome}
                                            onChange={modifyUser}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md mb-3">
                                        <label htmlFor="nascimento">Data de Nascimento</label><br/>
                                        <DatePicker
                                            name="nascimento"
                                            locale="pt-BR"
                                            dateFormat="P"
                                            renderCustomHeader={({
                                                date,
                                                changeYear,
                                                changeMonth,
                                                decreaseMonth,
                                                increaseMonth,
                                                prevMonthButtonDisabled,
                                                nextMonthButtonDisabled
                                            }) => (
                                                <div
                                                style={{
                                                    margin: 10,
                                                    display: "flex",
                                                    justifyContent: "center"
                                                }}
                                                >
                                                <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                                    {"<"}
                                                </button>
                                                <select
                                                    value={date.getFullYear()}
                                                    onChange={({ target: { value } }) => changeYear(value)}
                                                >
                                                    {years.map(option => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                    ))}
                                                </select>

                                                <select
                                                    value={months[date.getMonth()]}
                                                    onChange={({ target: { value } }) =>
                                                    changeMonth(months.indexOf(value))
                                                    }
                                                >
                                                    {months.map(option => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                    ))}
                                                </select>

                                                <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                                    {">"}
                                                </button>
                                                </div>
                                            )}
                                            selected={p.app.state.dateDiario}
                                            onChange={date => p.app.setDateDiario(date)}
                                            />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md mb-3">
                                        <label htmlFor="atleta"> É atleta ou pratica atividade de alta intensidade? </label><br/>
                                        <input 
                                            name="atleta" 
                                            type="radio"
                                            value="S"
                                            onChange={modifyUser}
                                            checked={user.atleta==='S'}
                                        /> <label htmlFor="atleta"> Sim </label>
                                        <input 
                                            name="atleta" 
                                            className="ml-4"
                                            type="radio"
                                            value="N"
                                            onChange={modifyUser}
                                            checked={user.atleta==='N'}
                                        /> <label htmlFor="atleta"> Não </label>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md mb-3">
                                        <label htmlFor="altura">Altura</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="altura"
                                            value={user.altura}
                                            placeholder="Informe sua altura em centimetros"
                                            onChange={modifyUser}
                                        />
                                    </div>

                                    <div className="col-md mb-3">
                                        <label htmlFor="peso">Peso</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="peso"
                                            value={user.peso}
                                            placeholder="Informe seu peso em quilogramas"
                                            onChange={modifyUser}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12 mb-3">
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
                                    <div className="col-md-12">
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
                                    <input 
                                        name="termos" 
                                        type="checkbox"
                                        onChange={modifyTermos}
                                        checked={termos} 
                                    /> <label htmlFor="termos"> Concordo com a 
                                    <a href="#/" onClick={() => setOpenPrivacidade(true)}> Política de Privacidade </a>
                                    e 
                                    <a href="#/" onClick={() => setOpenTermos(true)}> Termos de Uso</a>
                                    </label>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md mb-3">
                                        <label htmlFor="btn-save-user"></label>
                                        <button
                                            type="submit"
                                            disabled={(changePassword.password === '' 
                                                || changePassword.pass_confirmation === '' 
                                                || changePassword.password !== changePassword.pass_confirmation
                                                || !termos)}
                                            id="btn-save-user"
                                            className="btn btn-primary btn-lg btn-block"
                                        >Cadastrar</button>
                                    </div>
                                </div>                                

                            </form>

                        </div>

                    </div>

                </div>

                <PrivacidadeDialog 
                    handleClose={closePrivacidade} 
                    open={openPrivacidade}
                />
                <TermosDialog 
                    handleClose={closeTermos} 
                    open={openTermos}
                />

                <footer className="my-5 pt-5 text-muted text-center text-small">
                    <p className="mb-1">© 2020 Oxedev</p>
                </footer>

            </div>


        </div>
    );
}

export default Cadastrar;