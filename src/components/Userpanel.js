import React, { Component } from 'react'
import WrappedNormalLoginForm from './LoginForm'
import { Modal, Layout, Button, notification } from 'antd'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const { Content } = Layout

class Userpanel extends Component {
  constructor() {
    super()

    this.state = {
      redirectFromUser: false
    }
  }

  componentWillMount() {
    this.props.onPageUpdate({ currentPage: 4 })
  }

  handleClick = () => {
    localStorage.removeItem('user')
    notification.open({
      type: 'success',
      message: 'Success',
      description: 'You have been successfully logged out',
    })
    this.props.onLogout({ loggedUser: false, userName: '', redirect: true })
  }

  render() {
    const { loggedUser, showLoginModal } = this.props.user
    const { redirectFromUser } = this.state

    const Login = () => {
      let pathname = window.location.pathname

      if(pathname === '/user' && !redirectFromUser){
        this.setState({ redirectFromUser: true })
      }

      return (
        <Modal
          title="Login"
          visible={ showLoginModal }
          onOk={ this.handleOk }
          onCancel={ this.handleCancel }
          footer={ null }>
          <WrappedNormalLoginForm/>
        </Modal>
      )
    }

    return (<React.Fragment>
      <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
        { redirectFromUser ? <Redirect to="/"/> : '' }
        { loggedUser ?
          <Button onClick={ this.handleClick }>Logout</Button>
        : <Login/> }
      </Content>
    </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  page: state.page
})

const mapDispatchToProps = dispatch => ({
  onPageUpdate: (page) => {
    dispatch({
      type: 'SET_PAGE',
      payload: page
    })
  },
  onLogout: (user) => {
    dispatch({
      type: 'LOGOUT_SUCCESS',
      payload: user,
    })
  }
})

const StoredUserpanel = connect(mapStateToProps, mapDispatchToProps)(Userpanel)

export default StoredUserpanel
