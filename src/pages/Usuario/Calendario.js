import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import { momentLocalizer } from 'react-big-calendar';

import BigCalendar from '../../layout/BigCalendar';

import dentaldietApi from '../../services/api';

const Calendario = (p) => {

    const api = dentaldietApi(p.app.state.token);

    const user = p.app.state.user;
    const [dieta, setDieta] = useState([]);

    const pLocalizer = momentLocalizer(moment);

    
    //carregar humores cadastradas
    async function loadDieta() {

        const userHeaders = {
            headers: {
                id: user._id
            }
        };

        const response = await api.get('/listDieta', userHeaders);
        console.log(response.data);
        setDieta(response.data);
    }

    //carregar usuario e humores
    useEffect(() => {

      if (user) {
          loadDieta();
      } else {
          p.history.push('/');
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    return (
        <div>

            <div className="main-container">

                <div className="container">

                    <div className="row">
                        <div className="col-md mb-3" style={{textAlign: "center"}}>
                            <h2 className="mb-1">Calendário</h2>
                        </div>
                    </div>

                    <div className="row"> 
                        <BigCalendar 
                            localizer={pLocalizer} 
                            events={dieta} 
                            defaultDate={new Date(p.app.state.dateDiario.getFullYear(),
                                p.app.state.dateDiario.getMonth(), 1)}
                            setDateDiario={p.app.setDateDiario}
                            history={p.history}
                            view={"month"}
                            tableHeight={"600px"}
                            resize={true}/>                
                    </div>

                </div>    

            </div>

        </div>
    );
}

export default Calendario;