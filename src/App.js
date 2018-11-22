import React, {Component} from 'react'
import StoredTimeline from './components/Timeline'
import Foot from './components/Foot'
import StoredPost from './components/Post'
import StoredBloggers from './components/Bloggers'
import StoredBeloved from './components/Beloved'
import NotFound from './components/NotFound'
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'
import { Layout, Icon, BackTop } from 'antd'
import 'antd/dist/antd.css'
import StoredUserpanel from './components/Userpanel'
import { StyledLogo, StyledSider, StyledLayout, StyledMenuitem, GlobalStyle, StyledMenu } from './styles/Styles.style'
import StoredModalLoginForm from './components/LoginForm'
import { connect } from 'react-redux'

const { Footer, Content } = Layout

function RandomTitle(characters, type) {
  let text = ''
  let possible = ''

  if(type === 1){
    possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 '
  } else if(type === 3){
    possible = 'abcdefghijklmnopqrstuvwxyz'
  } else {
    possible = '123456789'
  }
  for (let i = 0; i < characters; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

function RandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      collapsed: false,
      menu: {
        currentPage: 1,
        showLoginForm: false,
        collapsed: false
      }
    }
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed })
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
  }

  redirectToHome = () => {
    return <Redirect to="/"/>
  }

  handleShowLoginForm = () => {
    this.setState({
      menu: {
        ...this.state.menu,
        showLoginForm: true
      }
    })
  }

  render() {
    const { showLoginForm } = this.state.menu
    const { loggedUser, userName } = this.props.user

    return (<Router>
      <Layout>
        <GlobalStyle/>
        <BackTop/>
        <StyledSider breakpoint="lg" collapsedWidth="50" collapsible onCollapse={ this.onCollapse }>
          <StyledLogo collapsed={ this.state.collapsed ? 'collapsed' : '' }>BlogeJS</StyledLogo>
          <StyledMenu theme="dark" mode="inline" selectedKeys={ [String(this.props.page.currentPage)] } collapsed={ this.state.collapsed ? 'collapsed' : '' }>
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
        <StyledLayout collapsed={ this.state.collapsed ? 'collapsed' : '' }>
          <Content style={{ margin: '16px 16px 0' }}>
            { showLoginForm ? <StoredModalLoginForm/> : "" }
            <Switch>
              <Route exact path="/" component={ StoredTimeline }/>
              <Route path="/bloggers" component={ StoredBloggers }/>
              <Route path="/beloved" component={ StoredBeloved }/>
              <Route path="/user" component={ loggedUser ? StoredUserpanel : this.redirectToHome }/>
              <Route path="/post/:id" component={ StoredPost }/>
              <Route component={ NotFound }/>
            </Switch>
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

const StoredApp = connect(mapStateToProps)(App)

export default StoredApp
