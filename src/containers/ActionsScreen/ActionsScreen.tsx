import React from 'react';
import styles from './ActionsScreenStyles.module.css';
import { Location, History } from 'history';
import { Account } from '../../model/Account';
import { Permission } from '../../model/Enum/Permission';

export interface Props {
  location: Location;
  history: History
}

export interface State {
  account: Account;
}

class ActionScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      account: {
        login: this.props.location.state !== undefined ? this.props.location.state.login : '',
        name: this.props.location.state !== undefined ? this.props.location.state.name : '',
        password: this.props.location.state !== undefined ? this.props.location.state.password : '',
        permission: this.props.location.state !== undefined ? this.props.location.state.permission: '',
        _id: this.props.location.state !== undefined ? this.props.location.state.id: '',
        patent: this.props.location.state !== undefined ? this.props.location.state.patent: '',
        age: this.props.location.state !== undefined ? this.props.location.state.age: '',
      },
    }
  }

  logout = () => {
    this.props.history.push({ pathname:"/" })
  }

  redirectTo = (route: string) => {
    this.props.history.push({
       pathname:`/${route}`,
       state:{
        login: this.state.account.login,
        name: this.state.account.name,
        password: this.state.account.password,
        permission: this.state.account.permission,
        id: this.state.account._id,
        patent: this.state.account.patent,
        age: this.state.account.age
      }
    })
  }

  render() {
    if (this.state.account.login === '') {
      this.logout();
    }

    return this.state.account.permission === Permission.ADMIN ? (
      <body className={styles.background}>
        <button className={styles.container} onClick={() => this.redirectTo('ad-reports')}>
          <h3 className={styles.nameApp}>Approve/Disapprove Reports</h3>
        </button>
        <button className={`${styles.container} ${styles.logout}`} onClick={this.logout}>
          <h3 className={styles.nameLogout}>Logout</h3>
        </button>
      </body>
    ) : (
      <body className={styles.background}>
        <button className={styles.container} onClick={() => this.redirectTo('register-report')}>
          <h3 className={styles.nameApp}>Register Report</h3>
        </button>
        <button className={styles.container} onClick={() => this.redirectTo('consult-reports')}>
          <h3 className={styles.nameApp}>Consult Reports</h3>
        </button>
        <button className={`${styles.container} ${styles.logout}`} onClick={this.logout}>
          <h3 className={styles.nameLogout}>Logout</h3>
        </button>
      </body>
    )
  }
}

export default ActionScreen;
