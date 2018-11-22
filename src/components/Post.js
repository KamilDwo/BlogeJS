import React, {Component} from 'react'
import { Icon, Button, Skeleton } from 'antd'
import 'antd/dist/antd.css'
import { Link } from 'react-router-dom'
import { StyledContent } from '../styles/Styles.style'
import { Redirect } from 'react-router-dom'
import GetUser from '../helpers/User.helper'

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      postId: this.props.match.params.id,
      exists: true,
      postLoaded: null
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params

    this.loadPost(id, this)
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
    const { exists, postLoaded, isLoading } = this.state

    function PostContent(props) {
      return (<React.Fragment>
        { !isLoading ?
          <React.Fragment>
            <GetUser id={ props.post.user } post={ props.post.title } intro={ props.post.intro }/>
          </React.Fragment>
        :
        <Skeleton active paragraph={{ rows: 4 }} />
        }
      </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <Link to="/">
          <Button type="default" style={{ margin: '0 0 24px 0'}}>
            <Icon type="left" />Go back
          </Button>
        </Link>
        <StyledContent style={{ padding: 24, border: '1px solid #e8e8e8' }}>
          { exists ? <PostContent post={ postLoaded }/> : <Redirect to="/"/> }
        </StyledContent>
      </React.Fragment>
    )
  }
}

export default Post
