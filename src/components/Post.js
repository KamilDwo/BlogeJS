import React, {Component} from 'react'
import { Icon, Button, Skeleton, Affix } from 'antd'
import 'antd/dist/antd.css'
import { Link } from 'react-router-dom'
import { StyledContent, StyledAffixContainer } from '../styles/Styles.style'
import { Redirect } from 'react-router-dom'
import GetUser from '../helpers/User.helper'
import { connect } from 'react-redux'

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

  handleClick(affixed) {
    console.log(affixed);
  }

  render(){
    const { exists, postLoaded, isLoading } = this.state
    let container
    const postRows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const { affixed } = this.props.affix

    if (exists) {
      container = (isLoading ? <Skeleton active paragraph={{ rows: 4 }} /> :
        <React.Fragment>
          <Affix offsetTop={ 24 } style={{ position: 'absolute', right: '17px', top: '73px' }} onChange={ affixed => this.props.onPageUpdate({ affixed: affixed }) }>
            <StyledAffixContainer className={`affixed${ affixed }`}>
              <Button type="primary" shape="circle" icon="heart" style={{ display: 'block' }}/>
              <Button shape="circle" icon="user-add" style={{ display: 'block', marginTop: '10px' }}/>
              <Button shape="circle" icon="message" style={{ display: 'block', marginTop: '10px' }}/>
            </StyledAffixContainer>
          </Affix>
          <GetUser id={ postLoaded.user } post={ postLoaded.title } intro={ postLoaded.intro }/>
          <div className="post-container">
            { postRows.map(( number ) =>
              <p key={ number }>
                { postLoaded.content }
              </p>
            ) }
          </div>
        </React.Fragment>)
    } else {
      container = <Redirect to="/"/>
    }

    return (
      <React.Fragment>
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
  onPageUpdate: (affix) => {
    dispatch({
      type: 'TOGGLE_AFFIXED',
      payload: affix
    })
  },
})

const StoredPost = connect(mapStateToProps, mapDispatchToProps)(Post)

export default StoredPost
