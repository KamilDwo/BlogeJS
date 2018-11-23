import React, {Component} from 'react'
import { Icon, Button, Skeleton, Affix, Rate, Row, Col, Popover, Tooltip } from 'antd'
import 'antd/dist/antd.css'
import { Link } from 'react-router-dom'
import { StyledContent, StyledAffixContainer, StyledDivider, StyledColPost } from '../styles/Styles.style'
import { Redirect } from 'react-router-dom'
import GetUser from '../helpers/User.helper'
import { connect } from 'react-redux'
import CountRate from '../helpers/Rates.helper'
import { UserContext } from '../context/User.context';
import StoredModalLoginForm from '../components/LoginForm'

const ButtonGroup = Button.Group

const RatesTooltip = (info) => {
  const { rate, rates } = info
  let ratesTest

  if(rates === 0 || rates > 2){
    ratesTest = 'rates'
  } else if(rates === 1){
    ratesTest = 'rate'
  }

  return (<React.Fragment>{ rate } stars from { rates } { ratesTest }</React.Fragment>)
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
      loginModal: false
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params

    this.loadPost(id, this)
  }

  componentWillMount(){
    if(localStorage.getItem('rates')){
      const { postId } = this.state

      let rates = JSON.parse(localStorage.getItem('rates')).rates
      localStorage.setItem('rates', JSON.stringify({ rates }))
      this.setState({ postRate: CountRate(postId, 1), postRates: CountRate(postId, 2) })
    }
  }

  handleClick() {
      this.setState(state => ({
        loginModal: !state.loginModal
      }));
    }

  loadPost = (id, component) => {
    if(localStorage.getItem('posts')){
      let posts = JSON.parse(localStorage.getItem('posts')).posts
      let result = posts.find(obj => {
        return obj.url === id
      })

      if(result){
        let component = this
        setTimeout(function(){
          component.setState({ exists: true, isLoading: false, postLoaded: result })
        }, 500)
      } else {
        this.setState({ exists: false })
      }
    }
  }

  render(){
    const { exists, postLoaded, isLoading, postRate, postRates, loginModal } = this.state
    let container
    const postRows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const { affixed } = this.props.affix

    if (exists) {
      container = (isLoading ? <Skeleton active paragraph={{ rows: 4 }} /> :
        <React.Fragment>
          <Affix offsetTop={ 24 } onChange={ affixed => this.props.onAffixChange({ affixed: affixed }) }>
            <StyledAffixContainer className={`affixed${ affixed }`} style={{ position: 'fixed', right: '17px', top: '73px' }}>
              <Tooltip placement="left" title="Love this post"><Button type="primary" shape="circle" icon="heart" style={{ display: 'block' }}/></Tooltip>
              <Tooltip placement="left" title="Add this user to buddies"><Button shape="circle" icon="user-add" style={{ display: 'block', marginTop: '10px' }}/></Tooltip>
              <Tooltip placement="left" title="Talk about this post"><Button shape="circle" icon="message" style={{ display: 'block', marginTop: '10px' }}/></Tooltip>
            </StyledAffixContainer>
          </Affix>
          <GetUser id={ postLoaded.user } post={ postLoaded.title } intro={ postLoaded.intro }/>
          <div className="post-container">
            { postRows.map(( number ) =>
              <p key={ number }>
                { postLoaded.content }
              </p>
            ) }
            <StyledDivider></StyledDivider>
            <Row>
              <StyledColPost lg={ 12 } xs={ 24 }>
                <UserContext.Consumer>
                  { (userLogged) => userLogged ? <Popover
                    placement="topLeft"
                    title={ <React.Fragment>Rate this post</React.Fragment> }
                    content={ <RatesTooltip rate={ postRate } rates={ postRates }/> }>
                    <div style={{ display: 'inline-block' }}>
                      <Rate character={ <Icon type="star" /> } count={ 5 } value={ postRate } allowHalf/>
                    </div>
                  </Popover> : <Popover
                    placement="topLeft"
                    title={ <React.Fragment>Please <span style={{ cursor: 'pointer', color: '#1890ff' }} onClick={ this.handleClick.bind(this) }>Login</span> to rate</React.Fragment> }
                    content={ <RatesTooltip rate={ postRate } rates={ postRates }/> }>
                    <div style={{ display: 'inline-block' }}>
                      <Rate character={ <Icon type="star" /> } count={ 5 } value={ postRate } allowHalf disabled/>
                    </div>
                  </Popover> }
                </UserContext.Consumer>
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
        </React.Fragment>)
    } else {
      container = <Redirect to="/"/>
    }

    return (
      <React.Fragment>
        { loginModal ? <StoredModalLoginForm/> : "" }
        <Link to="/">
          <Button type="default" style={{ margin: '0 0 24px 0'}}>
            <Icon type="left" />Go back
          </Button>
        </Link>
        <StyledContent style={{ padding: 24, border: '1px solid #e8e8e8' }}>
          { container }
        </StyledContent>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  affix: state.affix
})

const mapDispatchToProps = dispatch => ({
  onAffixChange: (affix) => {
    dispatch({
      type: 'TOGGLE_AFFIXED',
      payload: affix
    })
  },
})

const StoredPost = connect(mapStateToProps, mapDispatchToProps)(Post)

export default StoredPost
