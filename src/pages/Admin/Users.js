import React, { useEffect, useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MaterialTable from 'material-table';
import Dialog from '@material-ui/core/Dialog';

import Cadastrar from '../Usuario/Cadastrar';
import Perfil from '../Usuario/Perfil';

import api from '../../services/api';

const Users = (p) => {

    const isMedium = useMediaQuery('(max-width: 1072px)');
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [selectedUser, setSelectedUser] = useState();
    const [user, setUser] = useState({
      _id: ''
    });
    const [usuarios, setUsuarios] = useState({
      columnsMobile: [
        { title: 'Nome', field: 'nome' },
        { title: 'Papel', field: 'papel' },
        { title: 'Curso', field: 'curso.nome' },
      ],
      columnsMedium: [
        { title: 'Nome', field: 'nome' },
        { title: 'Papel', field: 'papel' },
        { title: 'Curso', field: 'curso.nome' },
        { title: 'Instituição', field: 'instituicao.nome' },
      ],
      columns: [
        { title: 'Nome', field: 'nome' },
        { title: 'Papel', field: 'papel' },
        { title: 'Curso', field: 'curso.nome' },
        { title: 'Instituição', field: 'instituicao.nome', hidden: isMobile },
        { title: 'E-mail', field: 'email', hidden: isMobile },
      ],
      data: [],
    });
    const [openAddUser, setOpenAddUser] = useState(false);
    const [openEditUser, setOpenEditUser] = useState(false);

    const handleClickAddUser = () => {
      setOpenAddUser(true);
    };

    const handleCloseAddUser = () => {
      setOpenAddUser(false);
      loadUsuarios();
    };

    const handleClickEditUser = (user) => {
      setSelectedUser({
        _id: user._id,
        papel: user.papel,
        nome: user.nome,
        curso: user.curso._id,
        instituicao: user.instituicao._id,
        email: user.email,
        sexo: user.sexo,
        sendData: user.sendData,
        anonimo: user.anonimo
      });
      setOpenEditUser(true);
    };

    const handleCloseEditUser = () => {
      setOpenEditUser(false);
      loadUsuarios();
    };

    //buscar parceiros
    async function loadUsuarios() {

        const response = await api.get('/listProfs');
        setUsuarios((prevState) => {
          const data = response.data;
          return { ...prevState, data };
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

        if (user._id !== '') {
          loadUsuarios();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps   
    }, [user._id]);

    return (
        <div>

            <div className="main-wide-container">

                <div className="wide-container">

                    <div className="row">
                        <div className="col-md mb-3" style={{textAlign: "center"}}>
                            <h2 name="formCurso" className="mb-1">Usuários</h2>
                        </div>
                    </div>

                    <div className="row">
                      <div className="col">
                          <MaterialTable
                            title="Manutenção de Usuários"
                            columns={
                              (isMobile) 
                              ? usuarios.columnsMobile 
                              : (isMedium)
                                ? usuarios.columnsMedium
                                : usuarios.columns
                            }
                            data={usuarios.data}
                            actions={[
                              {
                                icon: 'add',
                                tooltip: 'Adicionar',
                                isFreeAction: true,
                                onClick: (event) => handleClickAddUser()
                              },
                              {
                                icon: 'edit',
                                tooltip: 'Editar',
                                isFreeAction: false,
                                onClick: (event, rowData) => handleClickEditUser(rowData)
                              }
                            ]}
                            options={{
                              actionsColumnIndex: -1,
                              pageSize: 10
                            }}
                            localization={{
                              pagination: {
                                  labelDisplayedRows: '{from}-{to} de {count}',
                                  labelRowsSelect: 'linhas'
                              },
                              toolbar: {
                                  nRowsSelected: '{0} linha(s) selecionadas',
                                  searchTooltip: 'Buscar',
                                  searchPlaceholder: 'Buscar'
                              },
                              header: {
                                  actions: 'Ações'
                              },
                              body: {
                                  emptyDataSourceMessage: 'Nenhum registro para mostrar',
                                  addTooltip: 'Criar',
                                  editTooltip: 'Editar',
                                  deleteTooltip: 'Deletar',
                                  editRow: {
                                      cancelTooltip: 'Cancelar',
                                      saveTooltip: 'Salvar',
                                      deleteText: 'Tem certeza que quer apagar esse usuário?'
                                  },
                                  filterRow: {
                                      filterTooltip: 'Filtrar'
                                  }
                              }
                            }}
                          />
                      </div>
                    </div>

                </div>

            </div>

            <Dialog 
              open={openAddUser} 
              onClose={handleCloseAddUser} 
              aria-labelledby="form-dialog-title"
              fullWidth={true}
              maxWidth={'lg'}
            >
              <Cadastrar 
                {...p} 
                admin={true} 
                loadUsuarios={loadUsuarios}
                handleCloseAddUser={handleCloseAddUser}
              />
            </Dialog>

            <Dialog 
              open={openEditUser} 
              onClose={handleCloseEditUser} 
              aria-labelledby="form-dialog-title"
              fullWidth={true}
              maxWidth={'lg'}
            >
              <Perfil 
                {...p} 
                admin={true} 
                loadUsuarios={loadUsuarios}
                handleCloseEditUser={handleCloseEditUser}
                userToEdit={selectedUser}
              />
            </Dialog>

        </div>
    );
}

export default Users;