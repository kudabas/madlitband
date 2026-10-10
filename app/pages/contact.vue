<script setup lang="ts">
import { band } from '~/data/band'

useSeoMeta({
  title: 'Kontak',
  description: 'Booking panggung, press, dan pertanyaan untuk MADLIT.',
})

const topics = ['Booking show', 'Press', 'Lainnya']
const form = reactive({
  name: '',
  email: '',
  topic: topics[0] ?? 'Booking show',
  message: '',
  company: '',
})
const error = ref('')
const sending = ref(false)
const dialog = ref<HTMLDialogElement | null>(null)

function closeModal() {
  dialog.value?.close()
}

function onBackdrop(event: MouseEvent) {
  if (event.target === dialog.value) closeModal()
}

async function submit() {
  error.value = ''

  if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
    error.value = 'Nama, email, dan pesan wajib diisi.'
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    error.value = 'Format email belum benar.'
    return
  }

  if (form.company) {
    await nextTick()
    dialog.value?.showModal()
    return
  }

  sending.value = true
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${band.email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        _subject: `[MADLIT] ${form.topic} — ${form.name.trim()}`,
        _replyto: form.email.trim(),
        _template: 'table',
        _captcha: 'false',
      }),
    })
    const result = await readSendResult(response)
    const success = String(result.success ?? '').toLowerCase()
    const notice = (result.message ?? '').toLowerCase()

    if (success === 'false' && notice.includes('activat')) {
      error.value = 'Buka Gmail madlitband@gmail.com, termasuk folder spam, lalu klik tautan Activate Form. Setelah itu kirim form sekali lagi.'
      return
    }

    const delivered = success === 'true'
      || success === '1'
      || notice.includes('submitted successfully')
      || (response.ok && success !== 'false')

    if (!delivered) {
      error.value = 'Pesan belum terkirim. Coba lagi sebentar lagi.'
      return
    }

    form.name = ''
    form.email = ''
    form.message = ''
    form.topic = topics[0] ?? 'Booking show'
    await nextTick()
    dialog.value?.showModal()
  } catch {
    error.value = 'Pesan belum terkirim. Coba lagi sebentar lagi.'
  } finally {
    sending.value = false
  }
}

async function readSendResult(response: Response) {
  const raw = await response.text()
  try {
    return JSON.parse(raw) as { success?: unknown, message?: string }
  } catch {
    return { message: raw }
  }
}
</script>

<template>
  <article class="page">
    <div class="wrap">
      <PageIntro
        kicker="Booking"
        title="Kontak"
        :lead="`Untuk tanggal, kota, dan kapasitas ruang. Setelah diisi, pesan langsung masuk ke ${band.email}.`"
      />

      <div class="split">
        <div class="stack">
          <p class="kicker">Langsung</p>
          <a class="mail" :href="`mailto:${band.email}`">{{ band.email }}</a>
          <p class="note">{{ band.location }} · {{ band.genre }}</p>
          <p class="note">Sertakan kota, tanggal, venue, dan perkiraan durasi set.</p>
        </div>

        <form class="form" @submit.prevent="submit">
          <label>
            Nama
            <input v-model="form.name" name="name" type="text" autocomplete="name" required>
          </label>
          <label>
            Email
            <input v-model="form.email" name="email" type="email" autocomplete="email" required>
          </label>
          <label>
            Urusan
            <select v-model="form.topic" name="topic">
              <option v-for="topic in topics" :key="topic" :value="topic">{{ topic }}</option>
            </select>
          </label>
          <label>
            Pesan
            <textarea v-model="form.message" name="message" required />
          </label>
          <label class="honey">
            Perusahaan
            <input v-model="form.company" name="company" type="text" tabindex="-1" autocomplete="off">
          </label>
          <p v-if="error" class="error">{{ error }}</p>
          <button type="submit" class="btn btn-fill" :disabled="sending">
            {{ sending ? 'Mengirim...' : 'Kirim lewat email' }}
          </button>
        </form>
      </div>
    </div>

    <dialog ref="dialog" class="sent-modal" @click="onBackdrop">
      <p class="kicker">Kontak</p>
      <h2>Pesan terkirim! Terimakasih kami akan membalas secepatnya!!!</h2>
      <button type="button" class="btn btn-fill" @click="closeModal">Tutup</button>
    </dialog>
  </article>
</template>

<style scoped>
.mail {
  font-family: var(--display);
  font-size: clamp(1.35rem, 5vw, 3rem);
  letter-spacing: 0.03em;
  line-height: 1.05;
  overflow-wrap: anywhere;
  text-decoration: none;
}

.mail:hover {
  color: var(--red);
}

.form {
  position: relative;
  display: grid;
  gap: 1rem;
}

label {
  display: grid;
  gap: 0.4rem;
  color: var(--muted);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

input,
select,
textarea {
  width: 100%;
  padding: 0.85rem 0.9rem;
  border: 1px solid var(--line);
  background: #000;
  color: var(--text);
  letter-spacing: 0;
  text-transform: none;
}

textarea {
  min-height: 9rem;
  resize: vertical;
}

.error {
  margin: 0;
  color: var(--red);
  letter-spacing: 0;
  text-transform: none;
}

.sent-modal {
  width: min(32rem, calc(100vw - 1.5rem));
  margin: auto;
  padding: 1.4rem;
  border: 1px solid var(--line);
  background: #000;
  color: #fff;
}

.sent-modal::backdrop {
  background: rgba(0, 0, 0, 0.82);
}

.sent-modal h2 {
  margin: 0.35rem 0 1.2rem;
  font-family: var(--display);
  font-size: clamp(2rem, 6vw, 3rem);
  font-weight: 400;
  letter-spacing: 0.03em;
  line-height: 0.92;
  text-transform: uppercase;
}

.honey {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.form .btn {
  justify-self: start;
  max-width: 100%;
}

.form .btn:disabled {
  opacity: 0.65;
  cursor: wait;
}
</style>
