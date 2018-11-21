import React, { Component } from 'react'
import WrappedNormalLoginForm from './LoginForm'
import { Modal, Layout, Button } from 'antd'
import { connect } from 'react-redux'

const { Content } = Layout


const LoggedPanel = () => {
  return (<Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
    Hello <Button onClick={ Logout }>Logout</Button>
  </Content>)
}

const Logout = () => {
  return (<React.Fragment/>)
}

class Userpanel extends Component {
  constructor() {
    super()
    this.state = {
      visible: true
    }
  }

  componentWillMount() {
    this.props.onPageUpdate({ currentPage: 4 })
  }

  handleCancel = () => {
    this.setState({ visible: false })
  }

  render() {
    const { loggedUser } = this.props.user

    const Login = () => {
      return (
        <Modal
          title="Login"
          visible={ this.state.visible }
          onOk={ this.handleOk }
          onCancel={ this.handleCancel }
          footer={ null }
          >
          <WrappedNormalLoginForm/>
        </Modal>
      )
    }



    return (<React.Fragment>
      { loggedUser ? <LoggedPanel/> : <Login/>}
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
})

const StoredUserpanel = connect(mapStateToProps, mapDispatchToProps)(Userpanel)

export default StoredUserpanel
