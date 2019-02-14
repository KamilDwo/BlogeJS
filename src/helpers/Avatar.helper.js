import React from "react";
import { Avatar, Tooltip } from "antd";
import axios from "axios";

const TooltipContainer = props => {
  const { isLoading, avatar, username } = props;

  if (isLoading) {
    return (
      <Tooltip placement="rightTop" title="Loading...">
        <Avatar icon="user" size={"large"} alt="Avatar loading..." />
      </Tooltip>
    );
  }
  return (
    <Tooltip placement="rightTop" title={username}>
      <Avatar src={avatar} size={"large"} alt="Avatar" />
    </Tooltip>
  );
};

class GetAvatar extends React.PureComponent {
  state = {
    avatar: null,
    username: null,
    isLoading: true,
    errors: null
  };

  getCharacter = () => {
    axios
      .get(`https://rickandmortyapi.com/api/character/${this.props.id}`)
      .then(response => {
        this.setState({
          ...this.state,
          avatar: response.data.image,
          username: response.data.name,
          isLoading: false
        });
      })
      .catch(error =>
        this.setState({ ...this.state, errors: error, isLoading: false })
      );
  };

  componentDidMount() {
    this.getCharacter();
  }

  render() {
    const { isLoading, avatar, username } = this.state;

    return (
      <TooltipContainer
        isLoading={isLoading}
        avatar={avatar}
        username={username}
      />
    );
  }
}

export default GetAvatar;
