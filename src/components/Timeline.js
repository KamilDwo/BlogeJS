import React, {Component} from 'react'
import { Card, Col, Row, Pagination } from 'antd'
import styled from 'styled-components'
import axios from 'axios'

const StyledPagination = styled(Pagination)`
  &&{
    margin-top: 24px;
  }
`

const StyledCol = styled(Col)`
  &&{
    margin-bottom: 24px;
  }
`

class Timeline extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      rows: null,
      page: 1
    }
  }

  componentDidMount() {
    let self = this;
    axios.get('http://localhost:3001/posts.json', {
      page: 1
    }).then(function (response) {
      self.setState({ rows:response.data.results })
    }).catch(function (error) {
      console.log(error)
    }).then(function () {
      self.setState({
         loading: false
       });
    })
  }


  render() {
    const { loading } = this.state
    let GridRows = []
    let gridElement
    let next, next2, letterIndex
    let Paginate

    if(this.state.rows){
      Paginate =
      <StyledPagination
        total={this.state.rows.length}
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
        pageSize={21}
        defaultCurrent={1}
      />
      for (let i = 0; i < this.state.rows.length; i = i + 3) {
        next = i + 1
        next2 = i + 2
        letterIndex = `row_${i}`

        gridElement =
        <Row gutter={16} key={letterIndex}>
          <StyledCol span={8} key={i}>
            <Card loading={loading} title={this.state.rows[i].name}>
              {this.state.rows[i].name}
            </Card>
          </StyledCol>
          <StyledCol span={8} key={next}>
            <Card loading={loading} title={this.state.rows[i].name}>
              {this.state.rows[next].name}
            </Card>
          </StyledCol>
          <StyledCol span={8} key={next2}>
            <Card loading={loading} title={this.state.rows[i].name}>
              {this.state.rows[next2].name}
            </Card>
          </StyledCol>
        </Row>
        GridRows.push(gridElement)
      }
    }

    return (<div>
      {GridRows}
      {Paginate}
    </div>)
  }
}

export default Timeline
