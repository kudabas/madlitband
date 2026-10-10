const inbox = 'madlitband@gmail.com'

interface ContactBody {
  name?: string
  email?: string
  topic?: string
  message?: string
  company?: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<ContactBody>(event)

  if (body.company) {
    return { ok: true }
  }

  const name = body.name?.trim() ?? ''
  const email = body.email?.trim() ?? ''
  const topic = body.topic?.trim() || 'Lainnya'
  const message = body.message?.trim() ?? ''

  if (!name || !email || !message) {
    throw createError({ statusCode: 400, statusMessage: 'Nama, email, dan pesan wajib diisi.' })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Format email belum benar.' })
  }

  if (name.length > 120 || email.length > 200 || topic.length > 80 || message.length > 5000) {
    throw createError({ statusCode: 400, statusMessage: 'Isian terlalu panjang.' })
  }

  const origin = getRequestURL(event).origin
  let status = 0
  let payload: unknown

  try {
    const response = await $fetch.raw('https://formsubmit.co/ajax/' + inbox, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Origin: origin,
        Referer: `${origin}/contact`,
      },
      body: {
        name,
        email,
        message,
        _subject: `[MADLIT] ${topic} — ${name}`,
        _replyto: email,
        _template: 'table',
        _captcha: 'false',
      },
    })
    status = response.status
    payload = response._data
  } catch (error) {
    const failed = error && typeof error === 'object' ? error as { status?: number, data?: unknown } : undefined
    status = failed?.status ?? 0
    payload = failed?.data
  }

  const result = readSendResult(payload)
  const success = String(result.success ?? '').toLowerCase()
  const notice = result.message.toLowerCase()

  if (success === 'false' && notice.includes('activat')) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Buka Gmail madlitband@gmail.com, termasuk folder spam, lalu klik tautan Activate Form. Setelah itu kirim form sekali lagi.',
    })
  }

  const delivered = success === 'true'
    || success === '1'
    || notice.includes('submitted successfully')
    || (status >= 200 && status < 300 && success !== 'false')

  if (!delivered) {
    throw createError({ statusCode: 502, statusMessage: 'Pesan belum terkirim. Coba lagi sebentar lagi.' })
  }

  return { ok: true }
})

function readSendResult(payload: unknown) {
  let data = payload
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch {
      return { success: undefined, message: data }
    }
  }

  if (data && typeof data === 'object') {
    const record = data as { success?: unknown, message?: unknown }
    return {
      success: record.success,
      message: typeof record.message === 'string' ? record.message : '',
    }
  }

  return { success: undefined, message: '' }
}
