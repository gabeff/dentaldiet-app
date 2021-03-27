import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from 'date-fns/locale/pt-BR';
import 'moment/locale/pt-br';

import dentaldietApi from '../../services/api';

registerLocale('pt-BR', ptBR);

const Perfil = (p) => {

    const api = dentaldietApi(p.app.state.token);

    const [user, setUser] = useState({
        nascimento: new Date()
    });
    const [dataNascimento, setDataNascimento] = useState(new Date());
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
        
        let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value; 
        if (e.target.type === 'number') value = value.replace(',', '.');

        setUser({
            ...user,
            [e.target.name]: value,
        });
    }

    function modifyNascimento(date) {

        setUser({
            ...user,
            nascimento: date
        })
    }

    //salva alterações do perfil do usuário no banco
    async function handleUserRegistration(e) {
        e.preventDefault();

        api.post('/updateUser', {
            user
        }).then((response) => {
            if (response.status === 200) {
                p.app.notify('success', 'Cadastro atualizado com sucesso.', 2);
                p.app.setCookie('user', response.data);
            } else {
                p.app.notify('warning', response.data, 2);
            }
        }).catch((err) => {
            console.log('Will log error');
            console.error(err);
            p.app.notify('danger', err.response.data, 2);
        });
    }

    //carregar usuario
    useEffect(() => {

      if (p.app.state.user) {
          setUser(p.app.state.user);
      } else {
          p.history.push('/');
      };

    }, [p]); 

    useEffect(() => {
        console.log(user.nascimento);
        setDataNascimento(new Date(user.nascimento));
    }, [user.nascimento]);

    return (
        <div>

            <div className="main-container">

                <div className="container">

                    <div className="row">
                        <div className="col-md mb-3" style={{textAlign: "center"}}>
                            <h2 className="mb-1">Perfil Usuário</h2>
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
                                    disabled
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
                                    selected={dataNascimento}
                                    onChange={date => modifyNascimento(date)}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md mb-3">
                                <label htmlFor="atleta"> É atleta? </label><br/>
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
                            <div className="col-md mb-3">
                                <label htmlFor="btn-save-user"></label>
                                <button
                                    type="submit"
                                    id="btn-save-user"
                                    className="btn btn-primary btn-lg btn-block"
                                >Atualizar Cadastro</button>
                            </div>
                        </div>                                

                    </form>

                </div>

            </div>

        </div>
    );
}

export default Perfil;