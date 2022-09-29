export interface LoginRequestData {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: string
}

export interface MeResponseData {
  id: number
  email: string
  login: string
}
