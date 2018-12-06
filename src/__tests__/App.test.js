import React from 'react'
import ReactDOM from 'react-dom'
import { App } from '../App'
import Adapter from 'enzyme-adapter-react-16'
import { configure, shallow, mount } from 'enzyme'
import store from '../store/store'
import { Provider } from 'react-redux'
import toJson from 'enzyme-to-json'
import { Layout, Menu, Pagination, Col, Button, Divider } from 'antd'
import { Link } from 'react-router-dom'
import configureStore from 'redux-mock-store'

configure({ adapter: new Adapter() })

describe('App', () => {
  let wrapper
  let propsUser = {}
  let propsPage = {}
  let mockStore = configureStore();


  beforeEach(() => {
    wrapper = shallow(<App user={ propsUser } page={ propsPage }/>)
  })

  test('matches to snapschot', () => {
      const component = wrapper.dive()

      expect(toJson(component)).toMatchSnapshot()
  })
})
