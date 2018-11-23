import React from 'react'
import ReactDOM from 'react-dom'
import StoredApp from '../App'
import Adapter from 'enzyme-adapter-react-16'
import { configure, shallow } from 'enzyme'
import store from '../store/store'
import { Provider } from 'react-redux'
import toJson from 'enzyme-to-json'

const options = {
  disableLifecycleMethods: true
}

configure({ adapter: new Adapter() })

describe('<StoredApp/>', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')

    ReactDOM.render(<Provider store={store}><StoredApp/></Provider>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('matches to snapschot', () => {
    const wrapper = shallow(<Provider store={store}><StoredApp/></Provider>, options).dive({ context: { store } }).dive().dive();

    expect(toJson(wrapper)).toMatchSnapshot()
  })

})
