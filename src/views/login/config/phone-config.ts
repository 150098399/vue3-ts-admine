export const rules = {
  num: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    {
      pattern: /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/,
      message: '请输入正确的手机号码',
      trigger: 'blur'
    }
  ],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
}
