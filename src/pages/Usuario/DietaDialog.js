import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { components } from "react-select";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import TableAlimentos from '../../layout/TableAlimentos';

import dentaldietApi from '../../services/api';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        backgroundColor: '#173e43',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    iconAdd: {
        color: '#173e43',
        fontSize: 50,
        position: 'relative', 
        cursor: 'pointer',
        animation: `$bounce 1s infinite linear`,
    },
    button: {
        color: '#3fb0ac',
        backgroundColor: '#fae596',
        margin: 2,
        '&:hover': {
            background: '#3fb0ac',
            color: '#fae596',
         },
    },
    "@keyframes bounce": {
        "0%": {
            bottom: '0.05em'
        },
        "25%": {
            bottom: '0.15em'
        },
        "50%": {
            bottom: '0.3em'
        },
        "75%": {
            bottom: '0.15em'
        },
        "100%": {
            bottom: 0
        }
      },
  }));
  
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DietaDialog = (p) => {

    const api = dentaldietApi(p.app.state.token);
    const classes = useStyles();
    const [openDieta, setopenDieta] = useState(false);

    const [dieta, setDieta] = useState({ alimentos: [], detailAlimentos: [] });
    const [alimentoOptions] = useState([]);
    const [alimento, setAlimento] = useState({});
    const [refeicaoOptions] = useState([]);
    const [refeicao, setRefeicao] = useState({});
    
    //atualiza dados da dieta
    const modifyDieta = e => {

        if (e === 'addAlimento') {

            if(!alimento._id) {
              p.app.notify('warning', 'Favor selecionar alimento novamente.', 3);
            }
            else if (dieta.alimentos.some(a => a === alimento._id)) {
              p.app.notify('warning', 'Alimento já foi adicionado nessa refeição.', 3);
            }
            else {
              dieta.alimentos.push(alimento._id);
              dieta.detailAlimentos.push(alimento);
            }

            setAlimento({});
        } else {

            //substituir , por . em campos numericos, para computar os decimais
            let value = (e.target.type === 'number') ? e.target.value.replace(',', '.') : e.target.value;
        
            setDieta({
                ...dieta,
                [e.target.name]: value,
            });
        }
    }

    async function delAlimento(alimentos) {

      alimentos.map((alimento) => {
        return setDieta({
            ...dieta,
            alimentos: dieta.alimentos.filter(a => a !== alimento._id),
            detailAlimentos: dieta.detailAlimentos.filter(a => a._id !== alimento._id),
        });
      });

    }

    //Carregar alimentos para popular lista de sugestões
    useEffect(() => {
        function feedAlimentosOptions() {

            alimentoOptions.splice(0, alimentoOptions.length);

            for (let i = 0; i < p.alimentos.length; i++) {
                    
                  let option = {
                      value: p.alimentos[i]._id,
                      id: p.alimentos[i]._id,
                      _id: p.alimentos[i]._id,
                      label: p.alimentos[i].descricao,
                      descricao: p.alimentos[i].descricao,
                      ph: p.alimentos[i].ph,
                      alto_teor_acucar: p.alimentos[i].alto_teor_acucar
                  };

                  alimentoOptions.push(option);
            }
        };

        if (p.alimentos) {
          feedAlimentosOptions();
        }

    }, [alimentoOptions, p.alimentos, p.user._id])

    //Carregar refeições para popular lista de sugestões
    useEffect(() => {
      function feedRefeicoesOptions() {

          refeicaoOptions.splice(0, refeicaoOptions.length);

          for (let i = 0; i < p.refeicoes.length; i++) {
                  
                let option = {
                    value: p.refeicoes[i]._id,
                    id: p.refeicoes[i]._id,
                    label: p.refeicoes[i].nome
                };

                refeicaoOptions.push(option);
          }
      };

      if (p.refeicoes) {
        feedRefeicoesOptions();
      }

    }, [refeicaoOptions, p.refeicoes, p.user._id]);

    async function selectAlimento(alimento) {
        
        if (alimento && alimento.__isNew__) {
            api.post('/createAlimento', {alimento: {descricao: alimento.value}}).then((response) => {
                if (response.status === 200) {
                    setAlimento(response.data);      
                    p.loadAlimentos(); 
                }
            }).catch((err) => {
                console.error(err);
            });
        } else { 
            setAlimento(alimento);
        }
    };

    const singleAlimentoValue = props => (
        <components.SingleValue {...props}>
            {props.data.label}
        </components.SingleValue>
    );

    async function selectRefeicao(refeicao) {
      setRefeicao(refeicao);
    };

    const singleRefeicaoValue = props => (
        <components.SingleValue {...props}>
            {props.data.label}
        </components.SingleValue>
    );

    const handleopenDieta = () => {
        setopenDieta(true);
    };

    const handleCloseDieta = () => {
        setopenDieta(false);
    };

    useEffect(() => {

        if (p.dieta) {
            var idsAlimentos = [];
            p.dieta.alimentos.map((alimento) => {
                return idsAlimentos.push(alimento._id);
            });

            setRefeicao({
                id: p.dieta.refeicao._id,
                value: p.dieta.refeicao._id,
                label: p.dieta.refeicao.label
            });
                
            setDieta({
                data: p.dieta.data,
                user_id: p.dieta.user_id,
                alimentos: idsAlimentos,
                detailAlimentos: p.dieta.alimentos,
                refeicao: p.dieta.refeicao._id,
            })
        }
    }, [p.dieta]);

    async function registrarRefeicao(e) {

        e.preventDefault();

        if (!refeicao.id) {
            p.app.notify('warning', 'Escolha uma refeição', 5);
            return;
        }

        if (dieta.alimentos.length<=0) {
            p.app.notify('warning', 'Você deve adicionar pelo menos um alimento', 5);
            return;
        }

        dieta.user_id = p.user._id;
        dieta.data = p.data;
        dieta.refeicao = refeicao.id;
        // permuta.valor = permuta.produtos.reduce(function (sum, produto) {
        //     return parseFloat(sum) + parseFloat(produto.valor);
        // }, 0);

        api.post('/createDieta', {dieta}).then((response) => {

            if (response.status === 200) {
                p.app.notify('success', 'Refeição cadastrada com sucesso!', 2);
                setDieta({
                    alimentos: [],
                    detailAlimentos: []
                });
                p.findDieta();
                handleCloseDieta();
            } else {
                p.app.notify('danger', response.data, 2);
            }
        }).catch((err) => {
            console.error(err);
            if (err.response.data) { p.app.notify('danger', err.response.data, 2); };
        });
    }

    const formatCreateLabel = inputValue => (
        <span style={{ color: '#173e43', fontWeight: 'bold' }}>Criar {inputValue}</span>
    );

    return (            
      <div>

          {(p.acao === 'ADD'
            ? <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block btn-save-categ"
                    onClick={handleopenDieta}
                >
                    Adicionar Refeição
                </button>
            : <Button 
                    variant="contained" 
                    className="ml-3 mb-1"
                    style={{color: 'white', backgroundColor: 'green'}}
                    onClick={handleopenDieta}
                >
                    EDITAR
                </Button>
          )}
          

          <Dialog fullScreen open={openDieta} onClose={handleCloseDieta} TransitionComponent={Transition}>
            <form className="needs-validation" noValidate="" onSubmit={registrarRefeicao}>
              <AppBar className={classes.appBar}>
              <Toolbar>
                  <IconButton edge="start" color="inherit" onClick={handleCloseDieta} aria-label="close">
                  <CloseIcon />
                  </IconButton>
                  <Typography variant="h6" className={classes.title}>
                      Registro de Refeição
                  </Typography>
                  <Button className={classes.button} type={"submit"}>
                      SALVAR
                  </Button>
              </Toolbar>
              </AppBar>
              <div className="container">
                  <div className="row">
                      <div className="col mt-2">
                          <label htmlFor="refeicao">Refeição</label>
                          {(p.dieta) 
                            ? <Typography 
                                    gutterBottom 
                                    variant="h5" 
                                    component="h5" 
                                >
                                    {p.dieta.refeicao.nome}
                                </Typography>
                            : <Select
                                isClearable
                                name="nomeRefeicao"
                                id="idRefeicao"
                                options={refeicaoOptions}
                                onChange={selectRefeicao}
                                placeholder="Selecione a refeição"
                                components={{ singleRefeicaoValue }}
                                required
                            />}
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-10 mt-2">
                          <label htmlFor="alimento">Alimento</label>
                          <CreatableSelect
                              isClearable
                              name="nomeAlimento"
                              id="idAlimento"
                              options={alimentoOptions}
                              onChange={selectAlimento}
                              placeholder="Escolha um alimento..."
                              formatCreateLabel={formatCreateLabel}
                              components={{ singleAlimentoValue }}
                              required
                          />
                      </div>
                      <div className="col-2 col-md-1 mt-2">
                          <br/>
                          <AddCircleIcon 
                              value="addAlimento"
                              className={classes.iconAdd}
                              onClick={() => modifyDieta("addAlimento")}
                          />
                      </div>
                      <div className="col-12 mt-2">
                          <TableAlimentos
                              rows={dieta.detailAlimentos}
                              delRow={delAlimento}
                              title={"Alimentos consumidos:"}
                              temValor={true}
                          />
                      </div>
                  </div> 
              </div>
            </form>
          </Dialog>

      </div>
    );
}

export default DietaDialog;