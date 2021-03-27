import React from 'react';
import { Calendar } from 'react-big-calendar';
import "./BigCalendar.css";

import denteBom from '../assets/dente-bom.png';
import denteRuim from '../assets/dente-ruim.png';

function Event({ event  }) {
  if (event.totalPHAcido > 0 || event.totalAcucarAlto > 0) {
    return ( <div style={{textAlign: 'center'}}><img src={denteRuim} height={"75"} alt='ruim'/></div> )
  } else {
    return ( <div style={{textAlign: 'center'}}><img src={denteBom} height={"75"} alt='bom' /></div> )
  }
}

function getViewToDisplay() {
  const { innerWidth: width} = window;
  let view;
  if (width > 750) {view = 'month'} else { view = 'agenda'};
  return {
    view
  };
}

class Main extends React.Component {

  constructor(props) {

      super(props);

      this.state = {
        defaultView: this.props.view,
        view: this.props.view,
        views: [this.props.view],
        tableHeight: this.props.tableHeight,
        resize: this.props.resize
      }

      this.handleResize = this.handleResize.bind(this);
      this.handleOnViewChange = this.handleOnViewChange.bind(this);
      window.addEventListener('resize', this.handleResize);
  }

  componentDidMount() {
    this.handleResize();
  }

  handleResize() {
    if (this.state.resize) {
      const v = getViewToDisplay();
      
      this.setState({
        defaultView: v.view,
        view: v.view,
        views: [v.view]
      })
    }
  }

  handleOnViewChange = e => {this.setState({view: e, defaultView: e})}

  render() {
    return (
      <Calendar
        selectable
        events={this.props.events}
        localizer={this.props.localizer}
        defaultDate={this.props.defaultDate}
        defaultView={this.state.defaultView}
        view={this.state.view}
        onView={(view) => this.handleOnViewChange(view)}
        views={this.state.views}
        style={{ height: this.state.tableHeight, width: "90%", margin: "0 auto", background: '#fff' }}
        onSelectSlot={date => {this.props.setDateDiario(date.start); this.props.history.push('/Usuario/Diario');}}
        onSelectEvent={event => {this.props.setDateDiario(new Date(event.start)); this.props.history.push('/Usuario/Diario');}}
        messages={{
          month: 'Mês', 
          week: 'Semana',
          previous: 'Voltar',
          next: 'Próximo',
          day: 'Dia',
          today: 'Hoje',
          event: 'Resultado',
          date: 'Data',
          time: 'Hora',
          noEventsInRange: 'Sem registros alimentares nesse intervalo.'
        }}
        components={{
          event: Event
        }}
      />
    );
  }
}

export default Main;