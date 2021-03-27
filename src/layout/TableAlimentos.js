import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ptBR } from '@material-ui/core/locale';

const theme = createMuiTheme({
    palette: {
        primary: {
          // light: será calculada com base em palette.primary.main,
          main: '#f5f5f5',
          // dark: será calculada com base em palette.primary.main,
          // contrastText: será calculada para contrastar com palette.primary.main
        },
        secondary: {
          light: '#3fb0ac',
          main: '#173e43',
          // dark: será calculada com base palette.secondary.main,
          contrastText: '#FFFFFF',
        },
        // Usado por `getContrastText()` para maximizar o contraste entre
        // o plano de fundo e o texto.
        contrastThreshold: 3,
        // Usado pelas funções abaixo para mudança de uma cor de luminância por aproximadamente
        // dois índices dentro de sua paleta tonal.
        // Por exemplo, mude de Red 500 para Red 300 ou Red 700.
        tonalOffset: 0.2,
      },
  }, ptBR);

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headRows = [
    { id: 'descricao', numeric: false, disablePadding: true, label: 'Alimento' },
    { id: 'ph', numeric: false, disablePadding: true, label: 'pH' },
    { id: 'alto_teor_acucar', numeric: false, disablePadding: true, label: 'Alto Teor Açúcar' },
];


function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, temValor } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'selecionar todos' }}
                    />
                </TableCell>
                {headRows.map(row => (
                    (row.id === 'ph' && temValor)
                    || (row.id !== 'ph')
                    ?   <TableCell
                            key={row.id}
                            align={row.numeric ? 'right' : 'left'}
                            padding={row.disablePadding ? 'none' : 'default'}
                            sortDirection={orderBy === row.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === row.id}
                                direction={order}
                                onClick={createSortHandler(row.id)}
                            >
                                {row.label}
                                {orderBy === row.id ? (
                                    <span className={classes.visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </span>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    : null
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
}));

const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subtitle1">
                        {numSelected} selecionados
                    </Typography>
                ) : (
                        <Typography variant="h6" id="tableTitle" style={{color: '#007EA7'}}>
                            {props.title}
                        </Typography>
                    )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton 
                            aria-label="delete" 
                            onClick={() => { if (window.confirm('Quer mesmo deletar esses itens?'))  props.delRow() } } 
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : null}
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    container: {
        maxHeight: 350,
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 330,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

// export default function EnhancedTable() {
const EnhancedTable = (p) => {

    const rows = p.rows;
    const title = p.title;
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('nome');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    useEffect(() => {
      console.log(rows);
    }, [rows]);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    function handleRequestSort(event, property) {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    }

    function handleSelectAllClick(event) {
        if (event.target.checked) {
            const newSelecteds = rows.map(n => n);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    }

    function handleClick(event, row) {
        if (event.target.tagName === 'INPUT') {
            const selectedIndex = selected.indexOf(row);
            let newSelected = [];

            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, row);
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selected.slice(1));
            } else if (selectedIndex === selected.length - 1) {
                newSelected = newSelected.concat(selected.slice(0, -1));
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    selected.slice(0, selectedIndex),
                    selected.slice(selectedIndex + 1),
                );
            }

            setSelected(newSelected);
        }
    }

    function deleteRow() {
        p.delRow(selected, function() {
            selected.length = 0;
        });
    }

    const isSelected = name => selected.indexOf(name) !== -1;

    return (
        <div className={classes.root}>
        <ThemeProvider theme={theme}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    delRow={deleteRow}
                    title={title}
                />
                <TableContainer className={classes.container}>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={'small'}
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                            temValor={p.temValor}
                        />
                        <TableBody>
                            {stableSort(rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), 
                            getSorting(order, orderBy))
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={(row._id) ? row._id : row.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>
                                            <TableCell 
                                                component="th" 
                                                id={labelId} 
                                                scope="row" 
                                                padding="none" 
                                            >
                                                {row.descricao}
                                            </TableCell>
                                            {(p.temValor)
                                                ?   <TableCell 
                                                        component="th" 
                                                        id={labelId} 
                                                        scope="row" 
                                                        padding="none" 
                                                    >
                                                        {row.ph}
                                                    </TableCell>
                                                : null
                                            }
                                            <TableCell 
                                                component="th" 
                                                id={labelId} 
                                                scope="row" 
                                                padding="none" 
                                            >
                                                {row.alto_teor_acucar ? 'Sim' : ''}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </ThemeProvider>
        </div>
    );
}

export default EnhancedTable;