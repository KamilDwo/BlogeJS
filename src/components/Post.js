import React, { Component } from "react";
import {
  Icon,
  Button,
  Skeleton,
  Affix,
  Rate,
  Row,
  Col,
  Popover,
  Tooltip
} from "antd";
import { Link } from "react-router-dom";
import {
  StyledContent,
  StyledAffixContainer,
  StyledDivider,
  StyledColPost
} from "../styles/Styles.style";
import { Redirect } from "react-router-dom";
import GetUser from "../helpers/User.helper";
import { connect } from "react-redux";
import CountRate from "../helpers/Rates.helper";
import axios from "axios";
import { Markup } from "interweave";
import { UrlMatcher } from "interweave-autolink";
import AuthService from "./AuthService";

const ButtonGroup = Button.Group;

const RatesTooltip = info => {
  const { rate, rates } = info;
  let ratesTest;

  if (rates === 0) {
    ratesTest = "rates";
  } else if (rates === 1) {
    ratesTest = "rate";
  } else {
    ratesTest = "rates";
  }

  return (
    <>
      {rate} stars from {rates} {ratesTest}
    </>
  );
};

const RateBox = props => {
  const { userLogged, postRate, postRates, rateEvent, loginEvent } = props;

  if (userLogged) {
    return (
      <Popover
        placement="topLeft"
        title="Rate this post"
        content={<RatesTooltip rate={postRate} rates={postRates} />}
      >
        <div style={{ display: "inline-block" }}>
          <Rate
            character={<Icon type="star" />}
            count={5}
            value={postRate}
            onChange={rateEvent}
          />
        </div>
      </Popover>
    );
  }
  return (
    <Popover
      placement="topLeft"
      title={
        <>
          Please
          <span
            style={{ cursor: "pointer", color: "#1890ff", margin: "0 5px" }}
            onClick={loginEvent}
          >
            Login
          </span>
          to rate
        </>
      }
      content={<RatesTooltip rate={postRate} rates={postRates} />}
    >
      <div style={{ display: "inline-block" }}>
        <Rate
          character={<Icon type="star" />}
          count={5}
          value={postRate}
          disabled
        />
      </div>
    </Popover>
  );
};

const PostContainer = props => {
  const {
    postExists,
    postLoading,
    affixed,
    postData,
    postRate,
    postRates,
    userLogged,
    rateEvent,
    loginEvent
  } = props;

  if (!postExists) {
    return <Redirect to="/" push />;
  } else if (postLoading) {
    return <Skeleton active paragraph={{ rows: 4 }} />;
  }
  return (
    <>
      <Affix
        offsetTop={24}
        onChange={affixed => this.props.onAffixChange({ affixed: affixed })}
      >
        <StyledAffixContainer
          className={`affixed${affixed}`}
          style={{ position: "fixed", right: "17px", top: "73px" }}
        >
          <Tooltip placement="left" title="Love this post">
            <Button
              type="primary"
              shape="circle"
              icon="heart"
              style={{ display: "block" }}
            />
          </Tooltip>
          <Tooltip placement="left" title="Add this user to buddies">
            <Button
              shape="circle"
              icon="user-add"
              style={{ display: "block", marginTop: "10px" }}
            />
          </Tooltip>
          <Tooltip placement="left" title="Talk about this post">
            <Button
              shape="circle"
              icon="message"
              style={{ display: "block", marginTop: "10px" }}
            />
          </Tooltip>
        </StyledAffixContainer>
      </Affix>
      <GetUser
        id={postData.postUser}
        post={postData.postTitle}
        intro={postData.postIntro}
      />
      <div className="post-container">
        <Markup
          content={postData.postContent}
          matchers={[new UrlMatcher("url")]}
        />
        <StyledDivider />
        <Row>
          <StyledColPost lg={12} xs={24}>
            <RateBox
              userLogged={userLogged}
              postRate={postRate}
              postRates={postRates}
              rateEvent={rateEvent}
              loginEvent={loginEvent}
            />
          </StyledColPost>
          <Col lg={12} xs={24}>
            <ButtonGroup style={{ float: "right" }}>
              <Button>
                <Icon type="left" />
                Prev post
              </Button>
              <Button>
                Next post
                <Icon type="right" />
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </div>
    </>
  );
};

class Post extends Component {
  state = {
    postLoading: true,
    postId: this.props.match.params.id,
    postExists: true,
    postLoaded: null,
    postRate: 0,
    postRates: 0,
    postVoted: false
  };

  Auth = new AuthService();

  componentDidMount() {
    const { id } = this.props.match.params;

    this.loadPost(id, this);

    if (localStorage.getItem("rates")) {
      const { postId } = this.state;

      let rates = JSON.parse(localStorage.getItem("rates")).rates;
      localStorage.setItem("rates", JSON.stringify({ rates }));
      this.setState({
        postRate: CountRate(postId, 1),
        postRates: CountRate(postId, 2)
      });
    }
  }

  handleLoginClick = () => {
    this.props.onLoginModalOpen({ showLoginModal: true });
  };

  loadPost = (id, component) => {
    axios
      .get("http://127.0.0.1:3002/post/" + id)
      .then(function(response) {
        if (response.data) {
          setTimeout(function() {
            component.setState({
              postExists: true,
              postLoading: false,
              postLoaded: response.data
            });
          }, 500);
        } else {
          component.setState({ postExists: false });
        }
      })
      .catch(function(error) {
        component.setState({ postExists: false });
      });
  };

  handleRate = value => {
    let rates = JSON.parse(localStorage.getItem("rates")).rates;
    const { postId } = this.state;

    rates.push({ post: postId, rate: value });
    localStorage.setItem("rates", JSON.stringify({ rates }));
    this.setState({
      postRate: CountRate(postId, 1),
      postRates: CountRate(postId, 2)
    });
  };

  render() {
    const {
      postExists,
      postLoaded,
      postLoading,
      postRate,
      postRates
    } = this.state;
    const { affixed } = this.props;
    const { loggedUser } = this.props.user;

    return (
      <>
        <Link to="/">
          <Button type="default" style={{ margin: "0 0 24px 0" }}>
            <Icon type="left" />
            Go back
          </Button>
        </Link>
        <StyledContent style={{ padding: 24, border: "1px solid #e8e8e8" }}>
          <PostContainer
            postExists={postExists}
            postLoading={postLoading}
            affixed={affixed}
            userLogged={loggedUser}
            postData={postLoaded}
            postRate={postRate}
            postRates={postRates}
            rateEvent={this.handleRate}
            loginEvent={this.handleLoginClick}
          />
        </StyledContent>
      </>
    );
  }
}

const mapStateToProps = state => ({
  affix: state.affix,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  onAffixChange: affix => {
    dispatch({
      type: "TOGGLE_AFFIXED",
      payload: affix
    });
  },
  onLoginModalOpen: user => {
    dispatch({
      type: "OPEN_MODAL",
      payload: user
    });
  }
});

const StoredPost = connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);

export default StoredPost;
