import React, { Component } from 'react'
import { Avatar, Tooltip } from 'antd'
import axios from 'axios'

class GetAvatar extends Component {
  _isMounted = false

  state = {
    avatar: '',
    username: '',
    isLoading: true,
    errors: null
  }

  getPosts() {
    axios.get(`https://rickandmortyapi.com/api/character/${ this.props.id }`)
    .then(response => {
       if (this._isMounted) {
        this.setState({
          avatar: response.data.image,
          username: response.data.name,
          isLoading: false
        })
      }
    })
    .catch(error => this.setState({ error, isLoading: false }))
  }

  componentDidMount() {
    this._isMounted = true
    this.getPosts()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    const { isLoading, avatar, username } = this.state

    return (
      <React.Fragment>
        <div>
          { !isLoading ? (
            <Tooltip placement="rightTop" title={ username }>
              <Avatar src={ avatar } size={ 'large' } alt="Avatar"/>
            </Tooltip>
          ) : (
            <Tooltip placement="rightTop" title="Loading...">
              <Avatar icon="user" size={ 'large' } alt="Avatar loading..."/>
            </Tooltip>
          ) }
        </div>
      </React.Fragment>
    );
  }
}

export default GetAvatar
