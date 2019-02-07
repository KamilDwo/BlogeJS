import React from 'react'
import { Avatar, Tooltip } from 'antd'
import axios from 'axios'

class GetUser extends React.Component {
  state = {
    avatar: '',
    username: 'unknown',
    isLoading: true,
    errors: null
  }

  getPosts() {
    axios.get(`https://rickandmortyapi.com/api/character/${ this.props.id }`)
    .then(response => {
      this.setState({
        avatar: response.data.image,
        username: response.data.name,
        isLoading: false
      })
    })
    .catch(error => this.setState({ error, isLoading: false }))
  }

  componentDidMount() {
    this.getPosts()
  }

  render() {
    const { isLoading, avatar, username } = this.state
    let showTooltip

    if(!isLoading){
      showTooltip = <Tooltip placement="rightTop" title={ username }>
        <Avatar src={ avatar } size={ 64 } alt="Avatar" style={{ float: 'left', marginRight: '16px' }}/>
      </Tooltip>
    } else {
      showTooltip = <Tooltip placement="rightTop" title="Loading...">
        <Avatar icon="user" size={ 64 } alt="Avatar loading..." style={{ float: 'left', marginRight: '16px' }}/>
      </Tooltip>
    }

    return (
      <>
        { showTooltip }
        <h3>{ this.props.post }</h3>
        by { username }
      </>
    )
  }
}

export default GetUser
