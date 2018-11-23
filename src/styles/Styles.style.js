import styled from 'styled-components'
import { Layout, Menu, Pagination, Col, Button, Divider } from 'antd'
import { createGlobalStyle } from 'styled-components'

const { Sider, Content } = Layout

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

const StyledDivider = styled(Divider)`
  &&{
    margin-top: 47px;
    margin-bottom: 27px;
    &:before{
      width: 5.8%;
    }
    &:after{
      width: calc(100% - 5.8%);
    }
  }
`

const StyledContent = styled(Content)`
  &&{
    background-color: #fff;
    user-select: none;
    .post-container{
      display: block;
      margin-top: 65px;
      p {
        max-width: 100%;
        word-break: break-all;
      }
    }
  }
`

const StyledAffixContainer = styled.div`
  background-color: #fff;
  box-sizing: border-box;
  padding: 10px;
  width: 54px;
  border: 1px solid transparent;
  z-index: 1;
  transition: border 0.3s;
  border-radius: 4px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  &.affixedtrue {
    border: 1px solid rgb(232, 232, 232);
    border-right: 0;
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

const StyledColPost = styled(Col)`
  &&{
    @media (max-width: 768px){
      margin-bottom: 20px;
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
  StyledMenu,
  StyledContent,
  StyledDivider,
  StyledAffixContainer,
  StyledColPost
}
