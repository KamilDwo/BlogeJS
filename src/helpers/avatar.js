import React, {Component} from 'react'
import { Avatar, Tooltip } from 'antd'

class GetAvatar extends Component {
  render() {
    const avatarName = `https://avatars.dicebear.com/v2/male/${this.props.name}.svg`
    return (
      <Tooltip placement="rightTop" title={this.props.username}>
        <Avatar src={avatarName}/>
      </Tooltip>
    )
  }
}

export default GetAvatar
