import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Modal } from 'antd'

import { IRootState, Dispatch } from '@/store'

const { confirm } = Modal

const mapState = (state: IRootState) => ({
  records: state.table.records,
  pagination: state.table.pagination,
  loading: state.loading.effects.table.asyncTableList
})

const mapDispatch = (dispatch: Dispatch) => ({
  tableList: dispatch.table.asyncTableList,
  tableDelete: dispatch.table.asyncTableDelete
})

interface IBasicProps
  extends Partial<ReturnType<typeof mapState>>,
    Partial<ReturnType<typeof mapDispatch>> {}

class Basic extends Component<IBasicProps, null> {
  columns: any[]

  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '中文',
        dataIndex: 'name'
      },
      {
        title: '英文',
        dataIndex: 'id'
      },
      {
        title: '数字',
        dataIndex: 'count'
      },
      {
        title: '时间',
        dataIndex: 'time'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: 'ip',
        dataIndex: 'ip'
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: status => (status ? '真' : '假')
      },
      {
        title: '图像',
        dataIndex: 'image',
        render: image => <img src={image} alt="" />
      },
      {
        title: '操作',
        render: record => (
          <span
            className="btn-link"
            onClick={() => {
              confirm({
                title: '确认删除?',
                content: '是否确认删除',
                onOk: this.handleDelete(record.id)
              })
            }}
          >
            删除
          </span>
        )
      }
    ]
  }

  componentDidMount(): void {
    this.props.tableList()
  }

  handleDelete = tableId => () => {
    console.log(tableId)
    this.props.tableDelete({ tableId })
  }

  pageOnChange = pagination => {
    console.log(pagination)
    this.props.tableList({
      current: pagination.current,
      pageSize: pagination.pageSize
    })
  }

  render() {
    return (
      <Table
        columns={this.columns}
        dataSource={this.props.records}
        loading={this.props.loading}
        pagination={this.props.pagination}
        onChange={this.pageOnChange}
        rowKey="id"
      />
    )
  }
}

export default connect(mapState, mapDispatch)(Basic)
