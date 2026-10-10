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
const sent = ref(false)
const sending = ref(false)

async function submit() {
  error.value = ''
  sent.value = false

  if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
    error.value = 'Nama, email, dan pesan wajib diisi.'
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    error.value = 'Format email belum benar.'
    return
  }

  sending.value = true
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name.trim(),
        email: form.email.trim(),
        topic: form.topic,
        message: form.message.trim(),
        company: form.company,
      },
    })
    sent.value = true
    form.name = ''
    form.email = ''
    form.message = ''
    form.topic = topics[0] ?? 'Booking show'
  } catch (caught) {
    const data = caught && typeof caught === 'object' && 'data' in caught
      ? caught.data as { statusMessage?: string, message?: string }
      : undefined
    error.value = data?.statusMessage || data?.message || 'Pesan belum terkirim. Coba lagi sebentar lagi.'
  } finally {
    sending.value = false
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
          <p v-else-if="sent" class="success">Pesan terkirim ke {{ band.email }}.</p>
          <button type="submit" class="btn btn-fill" :disabled="sending">
            {{ sending ? 'Mengirim...' : 'Kirim lewat email' }}
          </button>
        </form>
      </div>
    </div>
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

.error,
.success {
  margin: 0;
  letter-spacing: 0;
  text-transform: none;
}

.error {
  color: var(--red);
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
