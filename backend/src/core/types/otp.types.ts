export interface SendOTPParams {
  email: string | undefined
  username: string | undefined
  identifier: string | undefined
  type?: string
  data?: string | object
}
