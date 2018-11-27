import React, {Component} from 'react'
import 'antd/dist/antd.css'
import StoredTimeline from './components/Timeline'
import Foot from './components/Foot'
import StoredPost from './components/Post'
import StoredBloggers from './components/Bloggers'
import StoredBeloved from './components/Beloved'
import NotFound from './components/NotFound'
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'
import { Layout, Icon, BackTop } from 'antd'
import StoredUserpanel from './components/Userpanel'
import { StyledLogo, StyledSider, StyledLayout, StyledMenuitem, GlobalStyle, StyledMenu } from './styles/Styles.style'
import StoredModalLoginForm from './components/LoginForm'
import { connect } from 'react-redux'
import { UserContext } from './context/User.context'
import { RandomTitle, RandomInt } from './helpers/Random.helper'

const { Footer, Content } = Layout

class App extends Component {
  constructor() {
    super()

    this.state = {
      menu: {
        currentPage: 1
      }
    }
  }

  onCollapse = (collapsed) => {
    this.setState({
      menu: {
        ...this.state.menu,
        collapsedSider: collapsed
      }
    })
  }

  updateCurrentPage = (currentPage) => {
    this.setState({
      menu: {
        ...this.state.menu,
        currentPage: currentPage
      }
    })
  }

  componentWillMount = () => {
    if(!localStorage.getItem('posts')){
      let posts = [], number
      for (let i = 0; i < 139; i++) {
        number = i + 1
        posts.push({ title: RandomTitle(15, 1), intro: RandomTitle(15, 1), user: parseInt(RandomInt(1, 493)), url: number + '-' + RandomTitle(10, 3), content: RandomTitle(700, 1) })
      }
      localStorage.setItem('posts', JSON.stringify({ posts }))
    }
    if(!localStorage.getItem('rates')){
      let rates = []
      localStorage.setItem('rates', JSON.stringify({ rates }))
    }
  }

  redirectToHome = () => {
    return <Redirect to="/"/>
  }

  handleShowLoginForm = () => {
    this.props.onLoginModalOpen({ showLoginModal: true })
  }

  render = () => {
    const { collapsedSider } = this.state.menu
    const { loggedUser, userName, showLoginModal } = this.props.user
    const { currentPage } = this.props.page

    return (<Router>
      <Layout>
        <GlobalStyle/>
        <BackTop/>
        <StyledSider breakpoint="lg" collapsedWidth="50" collapsible onCollapse={ this.onCollapse }>
          <StyledLogo collapsed={ collapsedSider ? 'collapsed' : '' }>BlogeJS</StyledLogo>
          <StyledMenu theme="dark" mode="inline" selectedKeys={[ String(currentPage) ]} collapsed={ collapsedSider ? 'collapsed' : '' }>
            <StyledMenuitem key="1">
              <Link to="/">
                <Icon type="home" theme="outlined" />
                <span className="nav-text">Latest</span>
              </Link>
            </StyledMenuitem>
            <StyledMenuitem key="2">
              <Link to="/bloggers">
                <Icon type="team" theme="outlined" />
                <span className="nav-text">Bloggers</span>
              </Link>
            </StyledMenuitem>
            <StyledMenuitem key="3">
              <Link to="/beloved">
                <Icon type="heart" theme="outlined" />
                <span className="nav-text">Beloved</span>
              </Link>
            </StyledMenuitem>
            <StyledMenuitem key="4">
              { loggedUser ? <Link to="/user">
                <Icon type="user" />
                <span className="nav-text">{ userName }</span>
              </Link> :
              <div onClick={ this.handleShowLoginForm }>
                <Icon type="user" />
                <span className="nav-text">Userpanel</span>
              </div>
              }
            </StyledMenuitem>
          </StyledMenu>
        </StyledSider>
        <StyledLayout collapsed={ collapsedSider ? 'collapsed' : '' }>
          <Content style={{ margin: '16px 16px 0' }}>
            <UserContext.Provider value={{ loggedUser: loggedUser }}>
              { showLoginModal ? <StoredModalLoginForm/> : '' }
              <Switch>
                <Route exact path="/" component={ StoredTimeline }/>
                <Route path="/bloggers" component={ StoredBloggers }/>
                <Route path="/beloved" component={ StoredBeloved }/>
                <Route path="/user" component={ StoredUserpanel }/>
                <Route path="/post/:id" component={ StoredPost }/>
                <Route component={ NotFound }/>
              </Switch>
            </UserContext.Provider>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            <Foot/>
          </Footer>
        </StyledLayout>
      </Layout>
    </Router>)
  }
}

const mapStateToProps = state => ({
  user: state.user,
  page: state.page
})

const mapDispatchToProps = dispatch => ({
  onLoginModalOpen: (user) => {
    dispatch({
      type: 'OPEN_MODAL',
      payload: user,
    })
  }
})

const StoredApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default StoredApp
