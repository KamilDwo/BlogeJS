import React, { Component } from 'react'
import WrappedNormalLoginForm from './LoginForm'
import { Modal, Layout, Button, notification, Tabs, Form, Input, message } from 'antd' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import axios from 'axios' // eslint-disable-line no-unused-vars
import { StyledInputLabel, StyledInputError } from '../styles/Styles.style'

const { Content } = Layout
const ButtonGroup = Button.Group
const TabPane = Tabs.TabPane
const FormItem = Form.Item

const AddModal = Form.create()(
  class extends React.Component {
    constructor(props) {
      super(props)

      this.myRef = React.createRef();
      this.state = {
        postText: '',
        contentError: false
      }
    }

    handleChange = (value) => {
      this.setState({ postText: value })
    }

    handleCancelAdding = () => {
      this.props.onHidePostModal({ showPostModal: false })
    }

    submitForm = (e) => {
      const { postText } = this.state
      const { form, onHidePostModal } = this.props
      e.preventDefault()
      this.setState({ contentError: false })

      if(postText.length < 10){
        this.setState({ contentError: true })
      }

      form.validateFields((err, values) => {
        if (!err && postText.length >= 10) {
          axios.post('http://127.0.0.1:3002/post', {
            postTitle: values.postTitle,
            postContent: postText,
            postCreated: new Date(),
            postUser: 1
          })
          .then(function (response) {
            if(response.status === 200){
              message.success('Successfully added new post')
              onHidePostModal({ showPostModal: false })
            }
          })
          .catch(function (error) {
            console.log(error)
          })
        }
      })
    }

    render() {
      const { form, showPostModal } = this.props
      const { getFieldDecorator } = form
      const { contentError } = this.state

      /* eslint-disable */
      const modules = {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ]
      }
      /* eslint-enable */

      return (
        <Modal
          title="Add new post"
          visible={ showPostModal }
          onOk={ this.handleOk }
          onCancel={ this.handleCancelAdding }
          width={ 900 }
          footer={ [
            <Button key="back" onClick={ this.handleCancelAdding }>Cancel</Button>,
            <Button key="submit" type="primary" htmlType="submit" onClick={ this.submitForm }>
              Submit
            </Button>
          ] }
          style={{ top: 20 }}>
          <Form onSubmit={ this.handleSubmit } className="add-form" ref={ this.myRef }>
            <FormItem
            label="Title">
              { getFieldDecorator('postTitle', {
                rules: [{
                  required: true, message: 'Please input title!',
                }],
              })(
                <Input />
              ) }
            </FormItem>
            <FormItem>
              <StyledInputLabel>Content:</StyledInputLabel>
              <ReactQuill value={ this.state.postText }
                modules={ this.modules }
                onChange={ this.handleChange } />
              <StyledInputError showed={ contentError }>Please input content!</StyledInputError>
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

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

  componentDidMount() {
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
        { showPostModal ? <StoredAddModal showPostModal={ showPostModal }/> : '' }
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
const StoredAddModal = connect(mapStateToProps, mapDispatchToProps)(AddModal)


export default StoredUserpanel
