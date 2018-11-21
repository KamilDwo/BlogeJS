import React, { Component } from 'react'
import { Form, Icon, Input, notification } from 'antd'
import { Modal } from 'antd'
import { StyledSubmit } from '../styles/Styles.style'
import { connect } from 'react-redux'
//import { Redirect } from 'react-router-dom'

const FormItem = Form.Item

const openNotificationWithIcon = (type) => {
  let texts = {}

  switch (true) {
    case type === 'success':
      texts = {
        message: 'Success',
        description: 'You are now logged in.'
      }
      break;
      case type === 'error':
        texts = {
          message: 'Error',
          description: 'Wrong username of password.'
        }
        break;
        default:
  }
  notification[type](texts)
}

class NormalLoginForm extends Component {
  constructor() {
    super()
    this.state = {
      visible: true
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { userName, password } = values

        if(userName === 'admin' && password === 'a'){
          this.setState({ visible: false, redirect: true })
          openNotificationWithIcon('success');
          this.props.onLogin({ loggedUser: true, userName: userName, redirect: true })
        } else {
          openNotificationWithIcon('error');
        }
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <React.Fragment>
        <Modal
          title="Login"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              <StyledSubmit type="primary" htmlType="submit" className="login-form-button">
                Log in
              </StyledSubmit>
              Or <a href="user/register">register now!</a>
            </FormItem>
          </Form>
        </Modal>
      </React.Fragment>
    )
  }
}

const ModalLoginForm = Form.create()(NormalLoginForm)

const mapStateToProps = state => ({
  user: state.user,
  page: state.page
})

const mapDispatchToProps = dispatch => ({
  onLogin: (user) => {
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: user,
    })
  },
  onPageUpdate: (page) => {
    dispatch({
      type: 'SET_PAGE',
      payload: page
    })
  }
})

const StoredModalLoginForm = connect(mapStateToProps, mapDispatchToProps)(ModalLoginForm)

export default StoredModalLoginForm
