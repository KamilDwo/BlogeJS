import React, { Component } from 'react'
import { Icon, Button, Skeleton, Affix, Rate, Row, Col, Popover, Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import { StyledContent, StyledAffixContainer, StyledDivider, StyledColPost } from '../styles/Styles.style'
import { Redirect } from 'react-router-dom'
import GetUser from '../helpers/User.helper'
import { connect } from 'react-redux'
import CountRate from '../helpers/Rates.helper'
import StoredModalLoginForm from '../components/LoginForm'
import axios from 'axios'
import { Markup } from 'interweave'
import { UrlMatcher } from 'interweave-autolink'

const ButtonGroup = Button.Group

const RatesTooltip = (info) => {
  const { rate, rates } = info
  let ratesTest

  if(rates === 0){
    ratesTest = 'rates'
  } else if(rates === 1){
    ratesTest = 'rate'
  } else {
    ratesTest = 'rates'
  }

  return (<>{ rate } stars from { rates } { ratesTest }</>)
}

class Post extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      postId: this.props.match.params.id,
      exists: true,
      postLoaded: null,
      postRate: 0,
      postRates: 0,
      postVoted: false
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params

    this.loadPost(id, this)

    if(localStorage.getItem('rates')){
      const { postId } = this.state

      let rates = JSON.parse(localStorage.getItem('rates')).rates
      localStorage.setItem('rates', JSON.stringify({ rates }))
      this.setState({ postRate: CountRate(postId, 1), postRates: CountRate(postId, 2) })
    }
  }

  handleClick() {
    this.props.onLoginModalOpen({ showLoginModal: true })
  }

  loadPost = (id, component) => {
    axios.get('http://127.0.0.1:3002/post/' + id)
    .then(function (response) {
      if(response.data){
        setTimeout(function(){
          component.setState({ exists: true, isLoading: false, postLoaded: response.data })
        }, 500)
      } else {
          this.setState({ exists: false })
      }
    })
    .catch(function (error) {
        this.setState({ exists: false })
    })
  }

  handleRate = (value) => {
    let rates = JSON.parse(localStorage.getItem('rates')).rates
    const { postId } = this.state

    rates.push({ post: postId, rate: value })
    localStorage.setItem('rates', JSON.stringify({ rates }))
    this.setState({ postRate: CountRate(postId, 1), postRates: CountRate(postId, 2) })
  }

  render(){
    const { exists, postLoaded, isLoading, postRate, postRates } = this.state
    let modalContainer, postContainer, popoverContainer
    const { affixed } = this.props.affix
    const { loggedUser } = this.props.user

    if(loggedUser){
      modalContainer = <StoredModalLoginForm/>
      popoverContainer = <Popover
        placement="topLeft"
        title={ <>Rate this post</> }
        content={ <RatesTooltip rate={ postRate } rates={ postRates }/> }>
        <div style={{ display: 'inline-block' }}>
          <Rate character={ <Icon type="star" /> } count={ 5 } value={ postRate } onChange={ this.handleRate }/>
        </div>
      </Popover>
    } else {
      popoverContainer = <Popover
        placement="topLeft"
        title={ <>Please <span style={{ cursor: 'pointer', color: '#1890ff' }} onClick={ this.handleClick.bind(this) }>Login</span> to rate</> }
        content={ <RatesTooltip rate={ postRate } rates={ postRates }/> }>
        <div style={{ display: 'inline-block' }}>
          <Rate character={ <Icon type="star" /> } count={ 5 } value={ postRate } disabled/>
        </div>
      </Popover>
    }

    if (exists) {
      if(isLoading){
         postContainer = <Skeleton active paragraph={{ rows: 4 }} />
      } else {
        postContainer = <>
          <Affix offsetTop={ 24 } onChange={ affixed => this.props.onAffixChange({ affixed: affixed }) }>
            <StyledAffixContainer className={`affixed${ affixed }`} style={{ position: 'fixed', right: '17px', top: '73px' }}>
              <Tooltip placement="left" title="Love this post"><Button type="primary" shape="circle" icon="heart" style={{ display: 'block' }}/></Tooltip>
              <Tooltip placement="left" title="Add this user to buddies"><Button shape="circle" icon="user-add" style={{ display: 'block', marginTop: '10px' }}/></Tooltip>
              <Tooltip placement="left" title="Talk about this post"><Button shape="circle" icon="message" style={{ display: 'block', marginTop: '10px' }}/></Tooltip>
            </StyledAffixContainer>
          </Affix>
          <GetUser id={ postLoaded.postUser } post={ postLoaded.postTitle } intro={ postLoaded.postIntro }/>
          <div className="post-container">
            <Markup content={ postLoaded.postContent } matchers={ [new UrlMatcher('url')] }/>
            <StyledDivider></StyledDivider>
            <Row>
              <StyledColPost lg={ 12 } xs={ 24 }>
                { popoverContainer }
              </StyledColPost>
              <Col lg={ 12 } xs={ 24 }><ButtonGroup style={{ float: 'right' }}>
                <Button>
                  <Icon type="left" />Prev post
                </Button>
                <Button>
                  Next post<Icon type="right" />
                </Button>
              </ButtonGroup>
              </Col>
            </Row>
          </div>
        </>
      }
    } else {
      postContainer = <Redirect to="/"/>
    }

    return (
      <>
        { modalContainer }
        <Link to="/">
          <Button type="default" style={{ margin: '0 0 24px 0'}}>
            <Icon type="left" />Go back
          </Button>
        </Link>
        <StyledContent style={{ padding: 24, border: '1px solid #e8e8e8' }}>
          { postContainer }
        </StyledContent>
      </>
    )
  }
}

const mapStateToProps = state => ({
  affix: state.affix,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  onAffixChange: (affix) => {
    dispatch({
      type: 'TOGGLE_AFFIXED',
      payload: affix
    })
  },
  onLoginModalOpen: (user) => {
    dispatch({
      type: 'OPEN_MODAL',
      payload: user,
    })
  }
})

const StoredPost = connect(mapStateToProps, mapDispatchToProps)(Post)

export default StoredPost
