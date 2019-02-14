import React from "react";
import {
  Modal,
  Layout,
  Button,
  notification,
  Tabs,
  Form,
  Input,
  message
} from "antd";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { StyledInputLabel, StyledInputError } from "../styles/Styles.style";
import AuthService from "./AuthService";

const { Content } = Layout;
const ButtonGroup = Button.Group;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const wyswigModules = {
  toolbar: [
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" }
    ],
    ["link", "image"],
    ["clean"]
  ]
};
const userPanelPanes = [
  { title: "Tab 1", content: "Content of Tab 1", key: "1" },
  { title: "Tab 2", content: "Content of Tab 2", key: "2" },
  { title: "Tab 3", content: "Content of Tab 3", key: "3", closable: false }
];

const UserContainer = props => {
  const {
    loggedUser,
    redirectFromUser,
    handleAddPost,
    handleLogout,
    onChangeTab,
    activeKey,
    userPanelPanes
  } = props;
  let pathname = window.location.pathname;

  if (pathname === "/user" && redirectFromUser) {
    return <Redirect to="/" />;
  } else if (loggedUser) {
    return (
      <>
        <ButtonGroup>
          <Button type="primary" icon="form" onClick={handleAddPost}>
            Add post
          </Button>
          <Button onClick={handleLogout}>Logout</Button>
        </ButtonGroup>
        <Tabs
          onChange={onChangeTab}
          activeKey={activeKey}
          animated={false}
          style={{ marginTop: "25px" }}
        >
          {userPanelPanes.map(pane => (
            <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
              {pane.content}
            </TabPane>
          ))}
        </Tabs>
      </>
    );
  } else {
    return <Redirect to="/" />;
  }
};

const AddModal = Form.create()(
  class extends React.PureComponent {
    state = {
      postText: "",
      contentError: false
    };
    formRef = React.createRef();

    handleChange = value => {
      this.setState({ postText: value });
    };

    handleCancelAdding = () => {
      this.props.onHidePostModal({ showPostModal: false });
    };

    submitForm = e => {
      const { postText } = this.state;
      const { form, onHidePostModal } = this.props;

      e.preventDefault();
      this.setState({ contentError: false });

      if (postText.length < 10) {
        this.setState({ contentError: true });
      }

      form.validateFields((err, values) => {
        if (!err && postText.length >= 10) {
          axios
            .post("http://127.0.0.1:3002/post", {
              postTitle: values.postTitle,
              postContent: postText,
              postCreated: new Date(),
              postUser: 1
            })
            .then(function(response) {
              if (response.status === 200) {
                message.success("Successfully added new post");
                onHidePostModal({ showPostModal: false });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      });
    };

    render() {
      const { form, showPostModal } = this.props;
      const { getFieldDecorator } = form;
      const { contentError, postText } = this.state;

      return (
        <Modal
          title="Add new post"
          visible={showPostModal}
          onOk={this.handlePost}
          onCancel={this.handleCancelAdding}
          width={900}
          footer={[
            <Button key="back" onClick={this.handleCancelAdding}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              onClick={this.submitForm}
            >
              Submit
            </Button>
          ]}
          style={{ top: 20 }}
        >
          <Form
            onSubmit={this.handleSubmit}
            className="add-form"
            ref={this.formRef}
          >
            <FormItem label="Title">
              {getFieldDecorator("postTitle", {
                rules: [
                  {
                    required: true,
                    message: "Please input title!"
                  }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem>
              <StyledInputLabel>Content:</StyledInputLabel>
              <ReactQuill
                value={postText}
                modules={wyswigModules}
                onChange={this.handleChange}
              />
              <StyledInputError showed={contentError}>
                Please input content!
              </StyledInputError>
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

class Userpanel extends React.PureComponent {
  state = {
    redirectFromUser: false,
    activeKey: userPanelPanes[0].key,
    userPanelPanes
  };
  Auth = new AuthService();

  onChangeTab = activeKey => {
    this.setState({ activeKey });
  };

  componentDidMount() {
    this.props.onPageUpdate({ currentPage: 4 });
  }

  handleLogout = () => {
    localStorage.removeItem("user");
    this.Auth.logout();
    notification.open({
      type: "success",
      message: "Success",
      description: "You have been successfully logged out"
    });
    this.props.onLogout({ loggedUser: false, userName: "", redirect: true });
  };

  handleAddPost = () => {
    this.props.onShowPostModal({ showPostModal: true });
  };

  handleCancelAdding = () => {
    this.props.onHidePostModal({ showPostModal: false });
  };

  handlePost = () => {};

  render() {
    const { loggedUser } = this.props.user;
    const { redirectFromUser, activeKey, userPanelPanes } = this.state;
    const { showPostModal } = this.props.post;

    return (
      <>
        <Content
          style={{ background: "#fff", padding: 24, margin: 0, minHeight: 280 }}
        >
          <UserContainer
            loggedUser={loggedUser}
            showPostModal={showPostModal}
            redirectFromUser={redirectFromUser}
            handleAddPost={this.handleAddPost}
            handleLogout={this.handleLogout}
            onChangeTab={this.onChangeTab}
            activeKey={activeKey}
            userPanelPanes={userPanelPanes}
            handlePost={this.handlePost}
            handleCancelAdding={this.handleCancelAdding}
          />
          <StoredAddModal
            showPostModal={showPostModal}
            redirectFromUser={redirectFromUser}
            loggedUser={loggedUser}
          />
        </Content>
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  page: state.page,
  post: state.post
});

const mapDispatchToProps = dispatch => ({
  onPageUpdate: page => {
    dispatch({
      type: "SET_PAGE",
      payload: page
    });
  },
  onLogout: user => {
    dispatch({
      type: "LOGOUT_SUCCESS",
      payload: user
    });
  },
  onShowPostModal: post => {
    dispatch({
      type: "SHOW_POST_FORM",
      payload: post
    });
  },
  onHidePostModal: post => {
    dispatch({
      type: "HIDE_POST_FORM",
      payload: post
    });
  }
});

const StoredUserpanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(Userpanel);
const StoredAddModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddModal);

export default StoredUserpanel;
