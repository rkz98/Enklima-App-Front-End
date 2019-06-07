import React from 'react';
import axios from 'axios';
import styles from './LoginScreenStyles.module.css'
import { Account } from '../../model/Account';
import { History } from 'history';

export interface Props {
  history: History
}

export interface State {
  account: Account;
  redirect: boolean;
}

class LoginScreen extends React.Component<Props, State> {
  constructor(props: Props) {
      super(props)

      this.handleLoginChange = this.handleLoginChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

      this.state = {
        account: {},
        redirect: false
      }
  }
  
  handleLoginChange = (event: any) => {
    this.setState({
      account: {
        ...this.state.account,
        login: event.target.value
      }
    })
  }

  handlePasswordChange = (event: any) => {
    this.setState({
      account: {
        ...this.state.account,
        password: event.target.value
      }
    })
  }

  handleSubmit = (event: any) => {
    axios.post(`http://localhost:8080/authenticate`, this.state.account)
    .then((res: any) => {
      this.setState({
        redirect: true,
        account: {
          login: res.data.login,
          password: res.data.password,
          name: res.data.name,
          permission: res.data.permission,
          _id: res.data._id,
          patent: res.data.patent,
          age: res.data.age
        }
      }, () => this.redirectToActionsScreen())
    })
    .catch(err => {
      alert('Login and password wrong.');
    })
  }

  redirectToActionsScreen = () => {
    this.props.history.push({
      pathname:"/actions",
      state:{
        login: this.state.account.login,
        password: this.state.account.password,
        name: this.state.account.name,
        permission: this.state.account.permission,
        id: this.state.account._id,
        patent: this.state.account.patent,
        age: this.state.account.age
      }
   })
  }

  render() {
    return (
      <body className={styles.background}>
        <div className={styles.container}>
          <h3 className={styles.nameApp}>Énklima App</h3>
          <input 
            className={styles.inputForm} 
            type="text" 
            placeholder='Login'
            onBlur={this.handleLoginChange}
          />
          <input 
            className={styles.inputForm} 
            type="password" 
            placeholder='Password' 
            onBlur={this.handlePasswordChange}
          />
          <button className={styles.button} type='submit' onClick={this.handleSubmit}>Login</button>
        </div>
      </body>
    )
  }
}

export default LoginScreen;
