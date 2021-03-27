import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  media: {
    height: 240,
  },
});

const CartaoOrientacao = (p) => {

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={p.imagem}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {p.texto}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CartaoOrientacao;