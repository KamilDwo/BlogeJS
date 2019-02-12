import React from 'react'
import { StyledFooter } from '../styles/Styles.style'

const thisYear = (new Date()).getFullYear()

const Foot = () => (
  <StyledFooter>&copy; 2018-{thisYear} BlogeJS</StyledFooter>
)

export default Foot
