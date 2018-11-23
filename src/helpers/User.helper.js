import React, { Component } from 'react'
import { Avatar, Tooltip} from 'antd'
import axios from 'axios'

class GetUser extends Component {
  state = {
    avatar: '',
    username: '',
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
    this.getPosts();
  }

  render() {
    const { isLoading, avatar, username } = this.state

    return (
      <React.Fragment>
        { !isLoading ? (
          <React.Fragment>
            <Tooltip placement="rightTop" title={ username }>
              <Avatar src={ avatar } size={ 64 } alt="Avatar" style={{ float: 'left', marginRight: '16px' }}/>
            </Tooltip>
          </React.Fragment>
        ) : (
          <Tooltip placement="rightTop" title="Loading...">
            <Avatar icon="user" size={ 64 } alt="Avatar loading..." style={{ float: 'left', marginRight: '16px' }}/>
          </Tooltip>
        ) }
        <h3>{ this.props.post }</h3>
        by { username }
      </React.Fragment>
    );
  }
}

export default GetUser
