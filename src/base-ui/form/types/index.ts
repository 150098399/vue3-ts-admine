type IFormType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  // select 属性
  options?: any[]
  // 其他特殊的属性
  otherOptions?: any
}
