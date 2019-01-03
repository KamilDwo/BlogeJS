import React, { Component } from 'react'
import { Avatar, Tooltip } from 'antd'
import axios from 'axios'

class GetAvatar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      avatar: '',
      username: '',
      isLoading: true,
      errors: null
    }
  }

  getPosts = () => {
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

    if(isLoading){
      return (<Tooltip placement="rightTop" title="Loading...">
        <Avatar icon="user" size={ 'large' } alt="Avatar loading..."/>
      </Tooltip>)
    } else {
      return (<Tooltip placement="rightTop" title={ username }>
        <Avatar src={ avatar } size={ 'large' } alt="Avatar"/>
      </Tooltip>)
    }
  }
}

export default GetAvatar
