import React, {Component} from 'react'
import { Icon, Button } from 'antd'
import 'antd/dist/antd.css'
import { Link } from 'react-router-dom'
import { Layout } from 'antd'
import 'antd/dist/antd.css'
import styled from 'styled-components'

const { Content } = Layout;

const StyledContent = styled(Content)`
  &&{
    background-color: #fff;
    user-select: none;
  }
`

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postid: this.props.match.params.id
    }
  }

  render(){
    return (
      <div>
        <Link to="/">
          <Button type="default" style={{ margin: '0 0 24px 0'}}>
            <Icon type="left" />Go back
          </Button>
        </Link>
        <StyledContent style={{padding: 24, border: '1px solid #e8e8e8'}}>
          <h2>{this.state.postid}</h2> by admin
        </StyledContent>
      </div>)
  }
}

export default Post
