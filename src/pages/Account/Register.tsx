import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import { FormProps } from 'antd/lib/form'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import { IRootState, Dispatch } from '@/store'

const FormItem = Form.Item

const mapState = (state: IRootState) => ({
  isRegister: state.account.isRegister,
  loading: state.loading.effects.account.asyncRegister
})

const mapDispatch = (dispatch: Dispatch) => ({
  register: dispatch.account.asyncRegister
})

interface IRegisterProps
  extends FormProps,
    RouteComponentProps,
    Partial<ReturnType<typeof mapState>>,
    Partial<ReturnType<typeof mapDispatch>> {}

class Register extends Component<IRegisterProps, any> {
  handleSubmit = values => {
    console.log('Received values of form: ', values)
    delete values.repeatPassword
    this.props.register(values)
  }

  handleConfirmPassword = (_rule, value, callback) => {
    const { getFieldValue } = this.props.form
    if (value && value !== getFieldValue('password')) {
      callback('两次输入的密码不一致')
    }
    callback()
  }

  componentDidUpdate() {
    if (this.props.isRegister) {
      message.success('注册成功,请登录')
      this.props.history.push('/login')
    }
  }

  render() {
    return (
      <>
        <Form onFinishFailed={this.handleSubmit} style={{ width: '340px' }}>
          <FormItem>
            <Input
              prefix={<UserOutlined style={{ fontSize: 13 }} />}
              placeholder="请输入邮箱"
              size="large"
            />
          </FormItem>
          <FormItem>
            <Input
              prefix={<LockOutlined style={{ fontSize: 13 }} />}
              type="password"
              placeholder="请输入密码"
              size="large"
            />
          </FormItem>
          <FormItem
            rules={[
              {
                required: true,
                message: '请再次输入以确认新密码'
              },
              { validator: this.handleConfirmPassword }
            ]}
          >
            <Input
              prefix={<LockOutlined style={{ fontSize: 13 }} />}
              type="password"
              placeholder="重复密码"
              size="large"
            />
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              style={{ width: '100%' }}
              loading={this.props.loading}
            >
              注册
            </Button>
          </FormItem>
        </Form>
        <Link to="/login">已有账号，立即登录</Link>
      </>
    )
  }
}

export default connect(mapState, mapDispatch)(withRouter(Register))
