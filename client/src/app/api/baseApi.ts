import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import type { Ref } from 'vue'

export async function apiRequest<T = any>(
  config: AxiosRequestConfig,
  statusObj?: { loading?: Ref<boolean>; error?: Ref<string> },
): Promise<T | undefined> {
  if (statusObj?.loading) statusObj.loading.value = true
  if (statusObj?.error) statusObj.error.value = ''
  try {
    const response: AxiosResponse<T> = await axios(config)
    return response.data
  } catch (e: any) {
    if (statusObj?.error)
      statusObj.error.value = e?.response?.data?.message || e.message || 'Ошибка запроса'
    return undefined
  } finally {
    if (statusObj?.loading) statusObj.loading.value = false
  }
}
