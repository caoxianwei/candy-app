import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Tabs, Row, Col, Table, Modal } from 'antd';
import styles from './index.less';
import HeadMenu from '../../../components/headMenu';

import { config } from '../../../utils';

const { sessionKey } = config;

class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 0,
      pageSize: 20,
      isShow: false,
    };
  }
  componentDidMount() {
    const self = this;
    this.props.getMine({
      pageIndex: self.state.pageIndex,
      pageSize: self.state.pageSize,
    });
    this.props.clearBalanceList();
  }
  changePage(data) { /*
    this.props.getMine({
      pageIndex: data.current,
      pageSize: 10000000,
    });*/
  }
  goNext() {
    const self = this;
    this.state.pageIndex++;
    this.setState({
      pageIndex: self.state.pageIndex,
    });
    this.props.getMine({
      pageIndex: self.state.pageIndex,
      pageSize: self.state.pageSize,
    });
  }
  continue(record) {
    // sessionStorage.setItem(sessionKey.continue, JSON.stringify(record));
  }
  render() {
    const {
      trend,
      lucky,
    } = this.props;
    const { isLoading } = trend;
    const { balanceList, balanceText } = lucky;
    const columns = [
      { title: '种类', dataIndex: 'category', key: 'category', width: 75 },
      { title: '期数', dataIndex: 'serialCode', key: 'serialCode', width: '' },
      { title: '中奖金额', dataIndex: 'winReward', key: 'winReward', width: 75 },
    ];
    return (
      <Row className={styles.detailTab}>
        <Col xs={24} sm={0}>
          <HeadMenu title="我的购买记录" back="/lucky" />
        </Col>
        <Col span={24} className={styles.content}>
          <Table
            columns={columns}
            dataSource={balanceList}
            pagination={false}
            loading={isLoading}
            rowKey={(record, index) => index}
            onChange={this.changePage.bind(this)}
          />
          <Col span={24} className={styles.showMore}>
            <a onClick={this.goNext.bind(this)}>
              {balanceText}
            </a>
          </Col>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getMine(data) {
      dispatch({ type: 'lucky/getMine', payload: data });
    },
    clearBalanceList() {
      dispatch({ type: 'lucky/clearBalanceList' });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Tab);

