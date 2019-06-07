import React from 'react';
import styles from './RegisterReportScreenStyles.module.css'
import { Account } from '../../model/Account';
import { History, Location } from 'history';
import { Report } from '../../model/Report';
import axios from 'axios';

export interface Props {
  location: Location;
  history: History
}

export interface State {
  account: Account;
  report: Report;
}

class RegisterReportScreen extends React.Component<Props, State> {
  constructor(props: Props) {
      super(props)

      this.state = {
        account: {
          login: this.props.location.state !== undefined ? this.props.location.state.login : '',
          permission: this.props.location.state !== undefined ? this.props.location.state.permission: '',
          name: this.props.location.state !== undefined ? this.props.location.state.name: '',
          password: this.props.location.state !== undefined ? this.props.location.state.password: '',
          _id: this.props.location.state !== undefined ? this.props.location.state.id: '',
          patent: this.props.location.state !== undefined ? this.props.location.state.patent: '',
          age: this.props.location.state !== undefined ? this.props.location.state.age: '',
        },
        report: {
          officer_id: this.props.location.state.id
        }
      }
  }

  componentWillMount() {

  }

  logout = () => {
    this.props.history.push({ pathname:"/" })
  }

  redirectToActions = () => {
    this.props.history.push({
    pathname:'/actions',
    state:{
     login: this.state.account.login,
     permission: this.state.account.permission,
     name: this.state.account.permission,
     password: this.state.account.permission,
     id: this.state.account._id,
     patent: this.state.account.patent,
     age: this.state.account.age
   }
 })
  }

  handleReportChange = (event: any) => {
    this.setState({
      report: {
        ...this.state.report,
        report: event.target.value
      }
    })
  }

  handlePlaceChange = (event: any) => {
    this.setState({
      report: {
        ...this.state.report,
        place: event.target.value
      }
    })
  }

  handleSubmit = (event: any) => {
    axios.post(`http://localhost:8080/reports/`, this.state.report)
    .then((res: any) => {
      alert('Success to register report.');
    })
    .catch(err => {
      alert('Error to register report. Please try again.');
    })
  }

  render() {
    if (this.state.account.login === '') {
      this.logout();
    }

    return (
      <body className={styles.background}>
        <div className={styles.container}>
          <h3 className={styles.nameApp}>Register Report</h3>
          <textarea 
            className={styles.inputForm} 
            placeholder='Tell us more about de report...'
            onBlur={this.handleReportChange}
            required={true}
          />
          <input 
            className={styles.inputForm} 
            type="text" 
            placeholder='Where did it happen?' 
            onBlur={this.handlePlaceChange}
            required={true}
          />
          <button className={styles.button} type='submit' onClick={this.handleSubmit}>Register</button>
        </div>
        <button className={`${styles.containerBack} ${styles.marginTop} ${styles.back}`} onClick={this.redirectToActions}>
          <h3 className={styles.nameBack}>Back</h3>
        </button>
      </body>
    )
  }
}

export default RegisterReportScreen;
