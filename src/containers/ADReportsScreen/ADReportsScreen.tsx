import React from 'react';
import styles from './ADReportsScreenStyles.module.css'
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
  reportsApproved: Report[];
  reportsDisapproved: Report[];
}

class ADReportsScreen extends React.Component<Props, State> {
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
        reportsApproved: [],
        reportsDisapproved: []
      }
  }

  componentWillMount() {
    this.getReports();
  }

  getReports = () => {
    axios.get('http://localhost:8080/reports/get-reports-status?status=DISAPPROVED')
    .then((res: any) => {
      this.setState({
        reportsDisapproved: res.data
      })
    })
    axios.get('http://localhost:8080/reports/get-reports-status?status=APPROVED')
    .then((res: any) => {
      this.setState({
        reportsApproved: res.data
      })
    })
  }

  updateStatus = (status: String, id: String) => {
    axios.put('http://localhost:8080/reports/update-report-status', {status: status, id: id})
    .then((res: any) => {
     this.getReports();
    })
  }

  deleteReport = (id: String) => {
    axios.delete(`http://localhost:8080/reports/delete-report?id=${id}`)
    .then((res: any) => {
     this.getReports();
    })
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
     name: this.state.account.name,
     password: this.state.account.password,
     id: this.state.account._id,
     patent: this.state.account.patent,
     age: this.state.account.age
    }
   })
  }

  alertItem = (report: Report) => {
    return (
      `JSON information: {
        id: ${report._id},
        officer_id: ${report.officer_id},
        report: ${report.report},
        place: ${report.place},
        status: ${report.status}
        create_at: ${report.created_at}
      }`
    )
  }

  alertPassword = () => {
    return (
      `JSON information: {
        password: ${this.state.account.password}
      }`
    )
  }

  renderItemApproved = (report: Report) => {
    return (
      <table style={{marginTop: 10}} key={report._id!}>
        <tr onClick={() => alert(this.alertItem(report))}>
          <th>Report ID</th>
          <th>Disapprove</th>
          <th>Delete</th>
        </tr>
        <tr>
          <td>{report._id}</td>
          <td>
            <button 
              className={`${styles.button} ${styles.blue}`}
              onClick={() => this.updateStatus('DISAPPROVED', report._id!)} 
              type='submit'>Disapprove</button></td>
          <td>
            <button 
              className={`${styles.button} ${styles.red}`}
              onClick={() => this.deleteReport(report._id!)} 
              type='submit'>Delete</button></td>
        </tr>
      </table>
    )
  }

  renderItemDisapproved = (report: Report) => {
    return (
      <table style={{marginTop: 10}} key={report._id!}>
        <tr onClick={() => alert(this.alertItem(report))}>
          <th>Report ID</th>
          <th>Approve</th>
          <th>Delete</th>
        </tr>
        <tr>
          <td>{report._id}</td>
          <td>
            <button 
              className={`${styles.button} ${styles.green}`} 
              onClick={() => this.updateStatus('APPROVED', report._id!)} 
              type='submit'>Approve</button></td>
          <td>
            <button 
              className={`${styles.button} ${styles.red}`}
              onClick={() => this.deleteReport(report._id!)} 
              type='submit'>Delete</button></td>
        </tr>
      </table>
    )
  }

  render() {
    if (this.state.account.login === '') {
      this.logout();
    }

    return (
      <body className={styles.background}>
        <div className={styles.horizontal}>
          <div className={styles.containerTable}>
            <div className={styles.containerType}>
              <h3 className={styles.typeFontColor}>Approved Reports</h3>
            </div>
            {this.state.reportsApproved.map((element: Report) => this.renderItemApproved(element))}
          </div>
          <div className={`${styles.containerTable} ${styles.marginLeft}`}>
            <div className={styles.containerType}>
              <h3 className={styles.typeFontColor}>Disapproved Reports</h3>
            </div>
            {this.state.reportsDisapproved.map((element: Report) => this.renderItemDisapproved(element))}
          </div>
        </div>
        <div className={styles.horizontalFooter}>
          <button className={`${styles.container} ${styles.marginTop} ${styles.back}`} onClick={this.redirectToActions}>
            <h3 className={styles.nameBack}>Back</h3>
          </button>
          <div className={`${styles.containerInfo} ${styles.marginTop} ${styles.info} ${styles.marginLeft}`} onClick={() => alert(this.alertPassword())}>
            <h3 className={styles.nameBack}>
              {`Login: ${this.state.account.login} | Name: ${this.state.account.name} | Patent: ${this.state.account.patent} | Age: ${this.state.account.age}`}
            </h3>
          </div>
        </div>
      </body>
    )
  }
}

export default ADReportsScreen;
