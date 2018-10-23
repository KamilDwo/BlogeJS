import React, {Component} from 'react';
import {createGlobalStyle} from 'styled-components'
import Timeline from './components/Timeline';
import Foot from './components/Foot';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Layout, Menu, Icon, BackTop } from 'antd';
import 'antd/dist/antd.css';

const { Footer, Sider, Content } = Layout;

const GlobalStyle = createGlobalStyle `
  body {
    margin: 0;
    padding: 0;
    background: #FEFFFF;
    font-family: 'Open Sans', sans-serif;
  }
`;

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);



const StyledLogo = styled.div`
  height: 32px;
  background: rgba(255,255,255,.2);
  margin: 16px;
`;

const StyledSider = styled(Sider)`
  && {
    height: 100vh;
    overflow: auto;
    position: fixed;
    left: 0;
  }
`;

const StyledLayout = styled(Layout)`
  margin-left: 200px;
`;

const StyledMenuitem = styled(Menu.Item)`
  && {
    user-select: none;
    a {
      color: rgba(255, 255, 255, 0.65);
      text-decoration: none;
    }
    &:hover{
      a {
        color: #fff;
      }
    }
  }
  &.ant-menu-item-selected{
    a {
      color: #fff;
    }
  }
`;

class App extends Component {
  render() {
    return (<Router><Layout>
      <GlobalStyle/>
      <BackTop/>
      <StyledSider breakpoint="lg" collapsedWidth="0">
        <StyledLogo/>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
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
            <Link to="/user">
              <Icon type="user" />
              <span className="nav-text">Userpanel</span>
            </Link>
          </StyledMenuitem>
        </Menu>
      </StyledSider>
      <StyledLayout>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 1360 }}>
            <Timeline/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <Foot/>
        </Footer>
      </StyledLayout>
    </Layout></Router>);
  }
}

export default App;
