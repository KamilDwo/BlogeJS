import React, { Component } from 'react'
import WrappedNormalLoginForm from './LoginForm'
import { Modal, Layout, Button, notification, Tabs, Form, Input, message } from 'antd'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import axios from 'axios'

const { Content } = Layout
const ButtonGroup = Button.Group
const TabPane = Tabs.TabPane
const FormItem = Form.Item


class Userpanel extends Component {
  constructor() {
    super()

    this.newTabIndex = 0
    const panes = [
      { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
      { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
      { title: 'Tab 3', content: 'Content of Tab 3', key: '3', closable: false },
    ]

    this.state = {
      redirectFromUser: false,
      activeKey: panes[0].key,
      panes
    }
  }

  onChangeTab = (activeKey) => {
    this.setState({ activeKey })
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

  handleAddPost = () => {
    this.props.onShowPostModal({ showPostModal: true })
  }

  handleCancelAdding = () => {
    this.props.onHidePostModal({ showPostModal: false })
  }

  render() {
    const { loggedUser } = this.props.user
    const { redirectFromUser } = this.state
    const { showPostModal } = this.props.post

    const Login = () => {
      let pathname = window.location.pathname

      if(pathname === '/user' && !redirectFromUser){
        this.setState({ redirectFromUser: true })
      }

      return (
        <Modal
          title="Login"
          visible={ showPostModal }
          onOk={ this.handleOk }
          onCancel={ this.handleCancel }
          footer={ null }>
          <WrappedNormalLoginForm/>
        </Modal>
      )
    }

    const AddModal = () => {
      return (<Modal
        title="Add new post"
        visible={ showPostModal }
        onOk={ this.handleOk }
        onCancel={ this.handleCancelAdding }
        width={ 900 }
        footer={ [
          <Button key="back" onClick={ this.handleCancelAdding }>Cancel</Button>
        ] }
        style={{ top: 20 }}>
        <Form onSubmit={ this.handleSubmit } className="add-form">
          <FormItem
            { ...formItemLayout }
          label="Title">

            <Input />
            
          </FormItem>
          <FormItem>
            <ReactQuill value={ this.state.postText }
              modules={ this.modules }
              onChange={ this.handleChange } />
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </FormItem>
        </Form>
      </Modal>)
    }

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 21 },
      },
    }

    const LoggedPanel = () => {
      return (<React.Fragment>
        <ButtonGroup>
          <Button type="primary" icon="form" onClick={ this.handleAddPost }>Add post</Button>
          <Button onClick={ this.handleClick }>Logout</Button>
        </ButtonGroup>
        <Tabs
          onChange={ this.onChangeTab }
          activeKey={ this.state.activeKey }
          animated={ false }
          style={{ marginTop: '25px' }}>
          { this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>{pane.content}</TabPane>) }
        </Tabs>
      </React.Fragment>)
    }

    return (<React.Fragment>
      <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
        { redirectFromUser ? <Redirect to="/"/> : '' }
        { loggedUser ? <LoggedPanel/> : <Login/> }
        { showPostModal ? <AddModal/> : '' }
      </Content>
    </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  page: state.page,
  post: state.post
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
  },
  onShowPostModal: (post) => {
    dispatch({
      type: 'SHOW_POST_FORM',
      payload: post,
    })
  },
  onHidePostModal: (post) => {
    dispatch({
      type: 'HIDE_POST_FORM',
      payload: post,
    })
  }
})

const StoredUserpanel = connect(mapStateToProps, mapDispatchToProps)(Userpanel)

export default StoredUserpanel
