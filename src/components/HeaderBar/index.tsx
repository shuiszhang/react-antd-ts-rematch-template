import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Menu, Dropdown, Layout } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  DownOutlined,
} from '@ant-design/icons'
import { Dispatch, IRootState } from '@/store'
import './index.less'

const { Header } = Layout

const mapState = (state: IRootState) => ({
  collapsed: state.main.collapsed,
})

const mapDispatch = (dispatch: Dispatch) => ({
  toggleCollapsed: dispatch.main.toggleCollapsed,
})

interface IHeaderBarProps
  extends Partial<ReturnType<typeof mapState>>,
    Partial<ReturnType<typeof mapDispatch>> {}

class HeaderBar extends PureComponent<IHeaderBarProps, null> {
  handleCollapse = () => {
    this.props.toggleCollapsed()
  }

  clickMenu = ({ key }) => {
    if (key === '1') {
      // cookie.remove('user')
      window.location.href = '/login'
    }
  }

  render() {
    return (
      <Header
        className="header-wrapper"
        style={{
          width: `calc(100% - ${this.props.collapsed ? '80px' : '250px'})`,
        }}
      >
        <div className="left-menu">
          <div className="collapse-wrapper">
            {this.props.collapsed ? (
              <MenuUnfoldOutlined onClick={this.handleCollapse} />
            ) : (
              <MenuFoldOutlined onClick={this.handleCollapse} />
            )}
          </div>
        </div>
        <div className="right-menu">
          <div className="account">
            <Dropdown
              overlay={
                <Menu onClick={this.clickMenu}>
                  <Menu.Item key="1">退出登录</Menu.Item>
                </Menu>
              }
              trigger={['click', 'hover']}
            >
              <span>
                <UserOutlined
                  style={{ fontSize: '16px', paddingRight: '10px' }}
                />
                admin <DownOutlined />
              </span>
            </Dropdown>
          </div>
        </div>
      </Header>
    )
  }
}

export default connect(mapState, mapDispatch)(HeaderBar)
