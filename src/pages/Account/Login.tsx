import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import { IRootState, Dispatch } from '@/store'
import { passwordRules, emailRules } from '@/config/constants'

const FormItem = Form.Item

const mapState = (state: IRootState) => ({
  isLogin: state.account.isLogin,
  loading: state.loading.effects.account.asyncLogin,
})

const mapDispatch = (dispatch: Dispatch) => ({
  login: dispatch.account.asyncLogin,
})

interface ILoginProps
  extends RouteComponentProps,
    Partial<ReturnType<typeof mapState>>,
    Partial<ReturnType<typeof mapDispatch>> {}

class Login extends Component<ILoginProps, any> {
  handleSubmit = (values) => {
    console.log('Received values of form: ', values)
    this.props.login(values)
  }

  componentDidUpdate() {
    if (this.props.isLogin) {
      message.success('登录成功，欢迎回来')
      this.props.history.push('/')
    }
  }

  render() {
    return (
      <>
        <Form onFinish={this.handleSubmit} style={{ width: '340px' }}>
          <FormItem name="username" rules={emailRules as []}>
            <Input
              prefix={<UserOutlined style={{ fontSize: 13 }} />}
              placeholder="请输入邮箱"
              size="large"
            />
          </FormItem>
          <FormItem name="password" rules={passwordRules}>
            <Input
              prefix={<LockOutlined style={{ fontSize: 13 }} />}
              type="password"
              placeholder="请输入密码"
              size="large"
            />
          </FormItem>
          <div style={{ height: '65px' }} />
          <FormItem>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              style={{ width: '100%' }}
              loading={this.props.loading}
            >
              登录
            </Button>
          </FormItem>
        </Form>
        <Link to="/register">没有账号，立即注册</Link>
      </>
    )
  }
}

export default connect(mapState, mapDispatch)(withRouter(Login))
