export interface IAccountForm {
  id: string
  label: string
  type: string
  login: string
  password: string | null
}

export interface IAccount {
  id: string
  label: { text: string }[]
  type: string
  login: string
  password: string | null
}
