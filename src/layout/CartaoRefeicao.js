import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import phBom from '../assets/ph-bom.png';
import phRuim from '../assets/ph-ruim.png';
import sugar from '../assets/sugar.png';

import DietaDialog from '../pages/Usuario/DietaDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 300,
    maxWidth: "100%",
    minHeight: 250,
    marginTop: 30
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  title: {
    color: '#173e43',
    fontWeight:'bold',
  },
  subHeader: {
    color: '#fae596'
  },
  cardHeader: {
    backgroundColor: '#3fb0ac'
  },
  cardActions: {
    height: 40,
    padding: 10
  },
  aguardando: {
    backgroundColor: '#fffc96'
  },
  confirmada: {
    backgroundColor: '#96ff9d'
  },
  cancelada: {
    backgroundColor: '#ff9696'
  },
  collapse: {
    backgroundColor: '#f5f5f5'
  },
  debito: {
    color: 'red'
  },
  credito: {
    color: 'green'
  },
  confirmar: {
    color: 'white',
    backgroundColor: 'green'
  },
  cancelar: {
    color: 'white',
    backgroundColor: 'red'
  },
}));

const listStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    position: 'relative',
    overflow: 'auto',
    marginTop: 5,
  },
  ul: {
    padding: 0,
  },
  li: {
    padding: 0,
  },
}));

const CartaoRefeicao = (p) => {

  const classes = useStyles();
  const listClasses = listStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        classes={{ 
          root: classes.cardHeader,
          title: classes.title,
          subheader: classes.subHeader
        }}
        title={p.dieta.refeicao.nome}
      />
      <CardContent>
        <Typography 
          gutterBottom 
          variant="h2" 
          component="h2" 
        >
          <div className="row">
            <div className="col-12">
              <h6 className="main-title mb-1">Alimentos consumidos:</h6>
              <List dense className={listClasses.root}>
                <li>
                  <ul className={listClasses.ul}>
                    {p.dieta.alimentos.map((alimento, index) => (
                      <ListItem key={index} className={listClasses.li}>
                        <FiberManualRecordIcon 
                          style={{"height":"5px"}}
                        />
                        <ListItemText 
                          primary={alimento.descricao} 
                        />
                        {(alimento.ph<7) ? <img src={phRuim} height={"30"} alt='ph ruim'/> : null}
                        {(alimento.ph>=7) ? <img src={phBom} height={"30"} alt='ph bom'/> : null}
                        {(alimento.alto_teor_acucar) ? <img src={sugar} height={"20"} alt='alto teor de açúcar'/> : null}
                      </ListItem>
                    ))}
                  </ul>
                </li>
              </List>
            </div>
          </div>
        </Typography>
      </CardContent>
      <CardActions 
        disableSpacing 
        className={`${classes.cardActions}`}>
            <div className="row">
              <DietaDialog
                  acao={"EDITAR"}
                  alimentos={p.alimentos}
                  refeicoes={p.refeicoes}
                  user={p.user}
                  app={p.app}
                  data={p.app.state.dateDiario}
                  findDieta={p.findDieta}
                  dieta={p.dieta}
              />
              <Button 
                variant="contained" 
                color="secondary" 
                className={`${classes.cancelar} ml-3 mb-1`}
                onClick={() => p.deletarDieta(p.dieta)}
              >
                EXCLUIR
              </Button>
            </div>
      </CardActions>
    </Card>
  );
}

export default CartaoRefeicao;