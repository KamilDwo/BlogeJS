import styled from 'styled-components'
import { Layout, Menu, Pagination, Col, Button} from 'antd'
import 'antd/dist/antd.css'
import { createGlobalStyle } from 'styled-components'

const { Sider } = Layout

const GlobalStyle = createGlobalStyle `
  body {
    margin: 0;
    padding: 0;
    background-color: #f0f2f5 !important;
  }
`

const StyledLogo = styled.div `
  background: transparent;
  margin: 16px 0;
  color: #fff;
  user-select: none;
  text-align: center;
  ${ props => props.collapsed ? 'margin-left: 0; font-size: 10px;' : '' };
  transition: all 0.3s;
`

const StyledPagination = styled(Pagination)`
  &&{
    margin-top: 24px;
  }
`

const StyledSider = styled(Sider)`
  && {
    height: 100vh;
    overflow: auto;
    position: fixed;
    left: 0;
  }
`

const StyledMenu = styled(Menu)`
  && {
    .ant-menu-item {
      ${ props => props.collapsed ? 'padding-left: 15px!important' : '' };
    }
  }
`

const StyledSubmit = styled(Button)`
  && {
    width: 100%;
  }
`

const StyledLayout = styled(Layout)`
  margin-left: ${ props => props.collapsed ? '50px' : '200px' };
  transition: all 0.3s;
`

const StyledCol = styled(Col)`
  &&{
    margin-bottom: 24px;
    .ant-card{
      user-select: none;
      &:hover{
        border-color: #1890ff;
      }
    }
  }
`

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
`

export {
  StyledLogo,
  StyledSider,
  StyledLayout,
  StyledMenuitem,
  GlobalStyle,
  StyledPagination,
  StyledCol,
  StyledSubmit,
  StyledMenu
}
