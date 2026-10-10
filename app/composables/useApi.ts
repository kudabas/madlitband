import type { ApiSuccess } from '#shared/types/api'

export function useApi<T>(path: string) {
  return useFetch<ApiSuccess<T>>(path)
}
