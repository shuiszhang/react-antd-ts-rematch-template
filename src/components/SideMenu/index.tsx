import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Menu, Layout } from 'antd'

import { Dispatch, IRootState } from '@/store'
import menu from '@/navigator'
import logo from '@/assets/images/favicon.png'
import './index.less'

const { SubMenu } = Menu
const { Sider } = Layout

const keyMaps = {
  '/403': {
    openKeys: ['/error'],
    selectKeys: ['/403'],
  },
  '/404': {
    openKeys: ['/error'],
    selectKeys: ['/404'],
  },
  '/500': {
    openKeys: ['/error'],
    selectKeys: ['/500'],
  },
}

interface ISideMenuState {
  collapsed: boolean
  pathname: string
  selectedKeys: string[]
  openKeys: string[]
  preOpenKeys: string[]
}

const mapState = (state: IRootState) => ({
  collapsed: state.main.collapsed,
})

const mapDispatch = (dispatch: Dispatch) => ({
  toggleCollapsed: dispatch.main.toggleCollapsed,
})

interface ISideMenuProps
  extends Partial<ReturnType<typeof mapState>>,
    Partial<ReturnType<typeof mapDispatch>> {}

class SideMenu extends Component<ISideMenuProps, ISideMenuState> {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.location.pathname !== prevState.pathname) {
      let open = []
      let select = []

      const arr = nextProps.location.pathname.split('/').filter(Boolean)
      if (arr && arr.length) {
        open.push(`/${arr[0]}`)
        select.push(`/${arr[0]}`)
        if (arr.length >= 2) {
          select.push(`/${arr[0]}/${arr[1]}`)
        }
      } else {
        select.push('/')
      }

      if (keyMaps[nextProps.location.pathname]) {
        const tmp = keyMaps[nextProps.location.pathname]
        open = [...open, ...tmp.openKeys]
        select = [...open, ...tmp.selectKeys]
      }

      return {
        ...prevState,
        pathname: nextProps.location.pathname,
        openKeys: open,
        selectedKeys: select,
      }
    }

    if (nextProps.collapsed !== prevState.collapsed) {
      return {
        ...prevState,
        collapsed: nextProps.collapsed,
        openKeys: !nextProps.collapsed ? prevState.preOpenKeys : [],
        preOpenKeys: !nextProps.collapsed
          ? prevState.preOpenKeys
          : prevState.openKeys,
      }
    }
    return null
  }

  constructor(props) {
    super(props)
    this.state = {
      collapsed: this.props.collapsed,
      pathname: '',
      selectedKeys: [],
      openKeys: [],
      preOpenKeys: [],
    }
  }

  // 递归生成左侧菜单树
  recurMenu = (routerArr) =>
    routerArr.map((item) => {
      if (item.children && item.children.length > 0) {
        return (
          <SubMenu
            key={item.path}
            onTitleClick={this.handleSubMenuChange}
            title={
              <span>
                <span>{item.title}</span>
              </span>
            }
          >
            {this.recurMenu(item.children)}
          </SubMenu>
        )
      }

      return (
        <Menu.Item key={item.path} onClick={this.handleMenuItemClick}>
          <Link style={{ display: 'inline-block' }} to={item.path}>
            {item.title}
          </Link>
        </Menu.Item>
      )
    })

  handleSubMenuChange = ({ key }) => {
    this.setState((prevState) => {
      if (prevState.openKeys && prevState.openKeys[0] === key) {
        return {
          ...prevState,
          openKeys: [],
        }
      }

      return {
        ...prevState,
        openKeys: [key],
        preOpenKeys: [key],
      }
    })
  }

  handleMenuItemClick = ({ key }) => {
    this.setState({ selectedKeys: [key] })
  }

  render() {
    return (
      <Sider
        theme="dark"
        className="side-wrapper"
        width={250}
        trigger={null}
        collapsible={true}
        collapsed={this.props.collapsed}
      >
        <div className="side-top">
          <img src={logo} alt="logo" />
          <span className="title">React Template</span>
        </div>

        <Menu
          mode="inline"
          selectedKeys={this.state.selectedKeys}
          openKeys={this.state.openKeys}
          theme="dark"
        >
          {this.recurMenu(menu)}
        </Menu>
      </Sider>
    )
  }
}

export default connect(mapState, mapDispatch)(withRouter(SideMenu))
