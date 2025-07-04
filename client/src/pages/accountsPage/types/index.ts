export interface ILabel {
  text: string
}
export interface IAccount {
  id: string
  label: ILabel[]
  type: string
  login: string
  password: string | null
  isNew?: boolean
}
export type IAccountForm = Omit<IAccount, 'id'>
