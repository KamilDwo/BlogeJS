import React, { Component } from 'react'
import { Card, Row, Icon } from 'antd'
import { Link } from 'react-router-dom'
import GetAvatar from '../helpers/avatar'
import { StyledPagination, StyledCol, StyledMoment } from '../styles/Styles.style'
import { connect } from 'react-redux'
import axios from 'axios'
import 'moment-timezone'

const { Meta } = Card

class Timeline extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      rows: null,
      page: 1,
      errors: null,
      allRows: 0,
      pages: 0
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
    axios.get('http://127.0.0.1:3002/post')
    .then(function (response) {
      let posts = response.data
      let postsPagination
      let numberOfPages = Math.floor((posts.length + 21 - 0) / 21)
      let start = (page * 21) - (21 - 0)
      let end = Math.min(start + 21 - 0, posts.length)

      postsPagination = posts.slice(start, end)
      component.setState({
        page: page,
        rows: postsPagination,
        allRows: posts.length,
        isLoading: false,
        pages: numberOfPages
      })
    })
    .catch(function (error) {
      console.log(error)
    })
    /*
    if(localStorage.getItem('posts')){
      let posts = JSON.parse(localStorage.getItem('posts')).posts
      let postsPagination
      let numberOfPages = Math.floor((posts.length + 21 - 0) / 21)
      let start = (page * 21) - (21 - 0)
      let end = Math.min(start + 21 - 0, posts.length)

      postsPagination = posts.slice(start, end)
      component.setState({
        page: page,
        rows: postsPagination,
        allRows: posts.length,
        isLoading: false,
        pages: numberOfPages
      })
    }*/
  }

  changePage = (page) => {
    this.getPosts(page, this)
  }

  itemRender = (current, type, originalElement) => {
    if (type === 'prev') {
      return <Icon type="left-circle" alt="Previous page" style={{ fontSize: '20px', position: 'relative', top: '3px' }}/>
    } if (type === 'next') {
      return <Icon type="right-circle" alt="Next page" style={{ fontSize: '20px', position: 'relative', top: '3px' }}/>
    }
    return originalElement
  }

  createTable = (rows) => {
    let rowContents = [], contents, postUrl, stringKey, stringKey2
    
    contents = rows.reduce((acc, p, i) => {
      postUrl = `/post/${ rows[i]._id }`
      stringKey = `r${ i }`
      stringKey2 = `r2${ i }`
      rowContents.push(<Link to={ postUrl } key={ i }>
        <StyledCol xl={ 8 } lg={ 12 } md={ 12 }>
          <Card>
            <StyledMoment format="D MMM YYYY, HH:mm" withTitle tz="Europe/Warsaw">
              { rows[i].postCreated }
            </StyledMoment>
            <Meta
              avatar={ <GetAvatar id={ rows[i].postUser }/> }
              title={ rows[i].postTitle }
              description={ rows[i].postIntro }
            />
          </Card>
        </StyledCol>
      </Link>)
      if (i % 3 === 3) {
        acc.push(<Row gutter={ 16 } key={ stringKey }>{ rowContents }</Row>)
        rowContents = []
      }
      return acc
    },[])
    contents.push(<Row gutter={ 16 } key={ stringKey2 }>{ rowContents }</Row>)

    return (
			<React.Fragment>{ contents }</React.Fragment>
		)
  }

  render() {
    const { isLoading, allRows } = this.state

    return (<React.Fragment>
      { !isLoading ? this.createTable(this.state.rows) : "" }
      <StyledPagination
        total={ allRows }
        pageSize={ 21 }
        current={ this.state.page }
        itemRender={ this.itemRender }
        onChange={ this.changePage }/>
    </React.Fragment>)
  }
}

const mapStateToProps = state => ({
  user: state.user,
  page: state.page
})

const mapDispatchToProps = dispatch => ({
  onPageUpdate: (page) => {
    dispatch({
      type: 'SET_PAGE',
      payload: page
    })
  },
  onLoginModalClose: (user) => {
    dispatch({
      type: 'CLOSE_MODAL',
      payload: user,
    })
  }
})

const StoredTimeline = connect(mapStateToProps, mapDispatchToProps)(Timeline)

export default StoredTimeline
