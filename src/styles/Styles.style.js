import styled from 'styled-components'
import { Layout, Menu, Pagination, Col, Button, Divider } from 'antd'
import { createGlobalStyle } from 'styled-components'
import Moment from 'react-moment'

const { Sider, Content } = Layout

const GlobalStyle = createGlobalStyle `
  body {
    margin: 0;
    padding: 0;
    background-color: #f0f2f5 !important;
  }
`

const StyledPagination = styled(Pagination)`
  &&{
    margin-top: 24px;
  }
`
const StyledMoment = styled(Moment)`
  &&{
    display: block;
    margin-bottom: 10px;
    margin-left: 56px;
  }
`;

const StyledInputLabel = styled.span `
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  &:before{
    display: inline-block;
    margin-right: 4px;
    content: "*";
    font-family: SimSun;
    line-height: 1;
    font-size: 14px;
    color: #f5222d;
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

const StyledInputError = styled.span `
  color: #f5222d;
  line-height: 1.524;
  transition: color 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  margin-top: -2px;
  clear: both;
  display: ${ props => props.showed ? 'block' : 'none' };
`

const StyledMenuitem = styled(Menu.Item)`
  && {
    user-select: none;
    margin-top: 0;
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
  StyledColPost,
  StyledInputLabel,
  StyledInputError,
  StyledMoment
}
