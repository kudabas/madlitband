import type { ApiSuccess, HealthStatus } from '#shared/types/api'

export default defineEventHandler((): ApiSuccess<HealthStatus> => {
  const config = useRuntimeConfig()

  return {
    ok: true,
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
      secretConfigured: Boolean(config.apiSecret),
    },
  }
})
