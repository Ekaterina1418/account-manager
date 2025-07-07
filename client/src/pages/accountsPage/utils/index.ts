import type { IAccountForm } from '../types'

export const apiBase = import.meta.env.VITE_API_URL;


export const typeOptions = [
  { label: 'LDAP', value: 'ldap' },
  { label: 'Локальная', value: 'local' },
]
export const emptyForm: Omit<IAccountForm, 'id'> = {
  label: [],
  type: 'local',
  login: '',
  password: '',
}
