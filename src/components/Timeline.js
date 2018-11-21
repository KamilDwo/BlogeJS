import React, {Component} from 'react'
import { Card, Row } from 'antd'
import axios from 'axios'
import { Link } from 'react-router-dom'
import RandomString from '../helpers/random'
import GetAvatar from '../helpers/avatar'
import { StyledPagination, StyledCol } from '../styles/Styles.style'
import { connect } from 'react-redux'

const { Meta } = Card

class Timeline extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      rows: null,
      page: 1
    }
  }

  componentWillMount() {
    if(this.props.page.currentPage !== 1){
      this.props.onPageUpdate({ currentPage: 1 })
    }
  }

  componentDidMount() {
    this.getPosts(1, this)
  }

  getPosts = (page, component) => {
    let url = `http://localhost:3003/posts_page${page}.json`

    axios.get(url).then(function (response) {
      component.setState({
        page: page,
        rows: response.data.results,
        loading: false
      })
    }).catch(function (error) {
    }).then(function () {

    })
  }

  changePage = (page) => {
    this.getPosts(page, this)
  }

  render() {
    const { loading } = this.state
    let GridRows = []
    let gridElement
    let next, next2, letterIndex
    let Paginate, postUrl

    if(this.state.rows){
      Paginate =
        <StyledPagination
          total={this.state.rows.length}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
          pageSize={21}
          defaultCurrent={1}
          onChange={this.changePage}
        />

      for (let i = 0; i < this.state.rows.length; i = i + 3) {
        next = i + 1
        next2 = i + 2
        letterIndex = `r${i}`
        postUrl = `/post/${this.state.rows[i].name}`

        gridElement = <Row gutter={16} key={letterIndex}>
          <Link to={postUrl}>
            <StyledCol span={8} key={i}>
              <Card loading={loading}>
                <Meta
                  avatar={<GetAvatar name={RandomString()} username={this.state.rows[i].username}/>}
                  title={this.state.rows[i].name}
                  description={this.state.rows[i].intro}
                />
              </Card>
            </StyledCol>
          </Link>
          <Link to={postUrl}>
            <StyledCol span={8} key={next}>
              <Card loading={loading}>
                <Meta
                  avatar={<GetAvatar name={RandomString()} username={this.state.rows[i].username}/>}
                  title={this.state.rows[i].name}
                  description={this.state.rows[i].intro}
                />
              </Card>
            </StyledCol>
          </Link>
          <Link to={postUrl}>
            <StyledCol span={8} key={next2}>
              <Card loading={loading}>
                <Meta
                  avatar={<GetAvatar name={RandomString()} username={this.state.rows[i].username}/>}
                  title={this.state.rows[i].name}
                  description={this.state.rows[i].intro}
                />
              </Card>
            </StyledCol>
          </Link>
        </Row>
        GridRows.push(gridElement)
      }
    }
    return (<React.Fragment>{GridRows}{Paginate}</React.Fragment>)
  }
}

const mapStateToProps = state => ({
  page: state.page
})

const mapDispatchToProps = dispatch => ({
  onPageUpdate: (page) => {
    dispatch({
      type: 'SET_PAGE',
      payload: page
    })
  },
})

const StoredTimeline = connect(mapStateToProps, mapDispatchToProps)(Timeline)

export default StoredTimeline
