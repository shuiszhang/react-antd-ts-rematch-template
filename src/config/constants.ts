export const phoneRules = [
  { required: true, message: '请输入手机号码' },
  { pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '请输入正确的手机号码' }
]

export const emailRules = [
  {
    type: 'email',
    required: true,
    message: '请输入正确的邮箱'
  },
  { max: 65, message: '邮箱太长' }
]

export const passwordRules = [
  { required: true, message: '请输入密码' },
  { min: 8, message: '至少为8位' }
]
