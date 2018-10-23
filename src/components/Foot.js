import React, {Component} from 'react';
import styled from 'styled-components';

const StyledText = styled.span`
  user-select: none;
  cursor: default;
  text-align: center;
`;

class Foot extends Component {
  render() {
    return (<StyledText>&copy; 2018 BlogeJS</StyledText>);
  }
}

export default Foot;
