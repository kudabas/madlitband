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
  let result: { success?: string | boolean, message?: string }

  try {
    result = await $fetch('https://formsubmit.co/ajax/' + inbox, {
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
  } catch {
    throw createError({ statusCode: 502, statusMessage: 'Pesan belum terkirim. Coba lagi sebentar lagi.' })
  }

  const notice = result.message?.toLowerCase() ?? ''
  if (notice.includes('activation') || notice.includes('activate')) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Buka Gmail madlitband@gmail.com, termasuk folder spam, lalu klik tautan Activate Form. Setelah itu kirim form sekali lagi.',
    })
  }

  if (result.success !== 'true' && result.success !== true) {
    throw createError({ statusCode: 502, statusMessage: 'Pesan belum terkirim. Coba lagi sebentar lagi.' })
  }

  return { ok: true }
})
