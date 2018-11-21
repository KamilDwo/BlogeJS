import React, {Component} from 'react'
import StoredTimeline from './components/Timeline'
import Foot from './components/Foot'
import Post from './components/Post'
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
              { loggedUser ? <Route path="/user" component={ StoredUserpanel }/> : <Redirect to="/"/> }
              <Route path="/post/:id" component={ Post }/>
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
