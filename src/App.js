import React, { Component } from 'react';
import NotificationAlert from 'react-notification-alert';
import { instanceOf } from 'prop-types';
import { CookiesProvider, withCookies, Cookies } from 'react-cookie';
import './App.css';

import Routes from './routes';

class App extends Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    
    const { cookies } = props;
    this.state = {
      user: cookies.get('user'),
      token: cookies.get('token'),
      dateDiario: new Date()
    };
    
    require('dotenv').config();

    this.notifyRef = React.createRef();

    this.setDateDiario = this.setDateDiario.bind(this);
    this.setCookie = this.setCookie.bind(this);
    this.removeCookie = this.removeCookie.bind(this);
    this.notify = this.notify.bind(this);
    this.dismissNotify = this.dismissNotify.bind(this);
  }

  setDateDiario(date) {
    this.setState({dateDiario: date});
  }

  setCookie(name, value) {
    const { cookies } = this.props;
    var expiryDate = (2 * 24 * 60 * 60); // 1 year in seconds

    cookies.set(name, value, { 
      path: '/', 
      maxAge: expiryDate,
    });
    this.setState({ [name]: value });
  }

  removeCookie(name) {
    const { cookies } = this.props;

    cookies.remove(name, { path: '/' });
    this.setState({ [name]: null });
  }

  notify(tipo, msg, seconds, close) {
    var options = {
      place: 'tc',
      message: msg,
      type: tipo,
      icon: "now-ui-icons ui-1_bell-53",
      autoDismiss: seconds,
      closeButton: close === undefined
    }

    this.notifyRef.current.notificationAlert(options);
  }

  dismissNotify(nNumber, place, noAnimate) {
    this.notifyRef.current.onDismiss(nNumber, place, noAnimate);
  }

  render() {
    return (
      <CookiesProvider>
        <div className="rna-container">
          <NotificationAlert ref={this.notifyRef} />
        </div>
        <Routes
          state={this.state}
          removeCookie={this.removeCookie}
          setDateDiario={this.setDateDiario}
          setCookie={this.setCookie}
          notify={this.notify}
          dismissNotify={this.dismissNotify}
        />
      </CookiesProvider>
    );
  }
}

export default withCookies(App);
