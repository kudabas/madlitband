export interface ApiSuccess<T> {
  ok: true
  data: T
}

export interface HealthStatus {
  status: 'ok'
  timestamp: string
  secretConfigured: boolean
}
