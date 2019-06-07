import React from 'react';
import styles from './ConsultReportsScreenStyles.module.css'
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
  reports: Report[];
}

class ConsultReportsScreen extends React.Component<Props, State> {
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
        reports: []
      }
  }

  componentWillMount() {
    axios.get('http://localhost:8080/reports/get-reports-status?status=APPROVED')
    .then((res: any) => {
      this.setState({
        reports: res.data
      })
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

  renderItem = (report: Report) => {
    return (
      <table style={{marginTop: 10}} >
        <tr onClick={() => alert(this.alertItem(report))}>
          <th>Report ID</th>
          <th>Create at</th>
        </tr>
        <tr>
          <td>{report._id}</td>
          <td>{report.created_at}</td>
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
        <div className={styles.containerTable}>
          <div className={styles.containerType}>
            <h3 className={styles.typeFontColor}>Consult Reports</h3>
          </div>
          {this.state.reports.map((element: Report) => this.renderItem(element))}
        </div>
        <button className={`${styles.container} ${styles.marginTop} ${styles.back}`} onClick={this.redirectToActions}>
          <h3 className={styles.nameBack}>Back</h3>
        </button>
      </body>
    )
  }
}

export default ConsultReportsScreen;
