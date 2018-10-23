import React, {Component} from 'react';
import { Card, Col, Row, Pagination } from 'antd';
import styled from 'styled-components';

const StyledPagination = styled(Pagination)`
  &&{
    margin-top: 24px;
  }
`;

class Timeline extends Component {
  state = {
   loading: true,
 }

  render() {
    const { loading } = this.state;

    setTimeout(() => {
      this.setState({
         loading: false
       });
     }, 2000);

    return (<div>
      <Row gutter={16}>
        <Col span={8}>
          <Card loading={loading} cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card loading={loading} cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card loading={loading} cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}>
            Card content
          </Card>
        </Col>
      </Row>
      <StyledPagination
        total={85}
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
        pageSize={20}
        defaultCurrent={1}
      />
    </div>);
  }
}

export default Timeline;
