import React, { useEffect, useState, useCallback, useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from 'date-fns/locale/pt-BR';
import 'moment/locale/pt-br';

import "react-datepicker/dist/react-datepicker.css";
import './Diario.css';

import api from '../../services/api';

import DentaldietContext from '../../DentaldietContext';

import DietaDialog from './DietaDialog';
import CartaoRefeicao from '../../layout/CartaoRefeicao';

import phBom from '../../assets/ph-bom.png';
import phRuim from '../../assets/ph-ruim.png';
import sugar from '../../assets/sugar.png';

registerLocale('pt-BR', ptBR);

const Humor = (p) => {

    const {user, dateDiario} = useContext(DentaldietContext);
    const [alimentos, setAlimentos] = useState([]);
    const [refeicoes, setRefeicoes] = useState([]);
    const [dieta, setDieta] = useState();

    const fetchDieta = useCallback(() => {

        const body = {
            userid: user._id, 
            data: dateDiario
        };

        api.post('/findDieta', body )
        .then((response) => {
            if (response.status === 200) {
                setDieta(response.data);
            }
        }).catch((err) => {
            console.error(err);
        });
    }, [user, dateDiario]);

    
    
    const fetchAlimentos = useCallback(() => {
        
        api.get('/listAlimento', {headers: {user_id: user._id}}).then((response) => {
            
            if (response.status === 200) {
                setAlimentos(response.data);
            } else {
                setAlimentos([]);
            }
            
        }).catch((err) => {
            console.error(err);
        });
    }, [user]);

    function deletarDieta(dieta) {

        api.post('/deleteDieta', {dieta}).then((response) => {

            if (response.status === 200) {
                p.app.notify('success', 'Refeição deletada com sucesso!', 2);
                fetchDieta();
            } else {
                p.app.notify('danger', response.data, 2);
            }
        }).catch((err) => {
            console.error(err);
            if (err.response.data) { p.app.notify('danger', err.response.data, 2); };
        });
    }
    
    //carregar dietas do usuário
    useEffect(() => {

        fetchDieta();  
    }, [fetchDieta]);
    
    //carregar dietas do usuário
    useEffect(() => {

        fetchAlimentos();  
    }, [fetchAlimentos]);

    //carregar refeicoes da dieta
    useEffect(() => {

        function fetchRefeicoes() {
            
            api.get('/listRefeicoes').then((response, err) => {
                
                if (response.status === 200) {

                    var refeicoes = response.data;
                    dieta.map((dieta) => {
                        return refeicoes = refeicoes.filter(a => a._id !== dieta.refeicao._id);
                    });

                    setRefeicoes(refeicoes);
                } else {
                    setRefeicoes([]);
                }
                
            }).catch((err) => {
                console.error(err);
            });
        };
        
        if (dieta) {
            fetchRefeicoes();
        }
    }, [dieta]);


    return (
        <div>

            <div className="main-container">

                <div className="container">

                    <div className="row">

                        {/* <!-- Sessão como você está? --> */}
                        <div className="col-md mb-3" style={{textAlign: "center"}}>
                            <h2 name="formHumor" className="mb-1">Registro diário alimentar</h2>
                        </div>

                        <div className="col-md-12 mb-4">
                            <div className="row" style={{textAlign: "center"}}>
                                <div className="col-md mb-3" style={{textAlign: "center"}}>
                                    <label htmlFor="data">Data do registro</label><br/>
                                    <DatePicker
                                        name="data"
                                        selected={dateDiario}
                                        locale="pt-BR"
                                        dateFormat="P"
                                        onChange={date => p.app.setDateDiario(date)}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md mb-3">
                                    <DietaDialog
                                        acao={"ADD"}
                                        alimentos={alimentos}
                                        refeicoes={refeicoes}
                                        user={user}
                                        app={p.app}
                                        data={dateDiario}
                                        findDieta={fetchDieta}
                                        loadAlimentos={fetchAlimentos}
                                    />
                                </div>
                            </div>

                            <Typography 
                                    gutterBottom 
                                    variant="h6" 
                                    component="h6" 
                            >
                                Legenda
                            </Typography>
                            <Typography 
                                    gutterBottom 
                                    variant="subtitle2" 
                            >
                                <Grid>
                                    <img src={phRuim} height={"30"} alt='ph ruim'/> - Alimento com pH Ácido
                                    <Divider orientation="vertical" flexItem />
                                    <img src={phBom} height={"30"} alt='ph bom'/> - Alimento com pH neutro ou alcalino
                                    <Divider orientation="vertical" flexItem />
                                    <img src={sugar} height={"20"} alt='alto teor de açúcar'/> - Alimento com alto teor da açúcar
                                </Grid>
                            </Typography>

                            {dieta ?
                            (dieta.sort((a, b) => a.refeicao.ordem > b.refeicao.ordem ? 1 : -1)
                            .map(d => (
                                <CartaoRefeicao
                                    key={d._id}
                                    alimentos={alimentos}
                                    refeicoes={refeicoes}
                                    dieta={d}
                                    user={user}
                                    notify={p.app.notify}
                                    history={p.history}
                                    app={p.app}
                                    findDieta={fetchDieta}
                                    deletarDieta={deletarDieta}
                                />
                            )))
                            : null}

                            
                        </div>


                    </div>

                </div>

            </div>


        </div>
    );
}

export default Humor;