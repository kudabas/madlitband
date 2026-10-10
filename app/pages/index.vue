<script setup lang="ts">
import { band, members, releases, shows } from '~/data/band'

useSeoMeta({
  description: 'Madlit, band Rock/Metal Heavy-Heavy Unit dari Bandung. Berdiri tahun 2023. Maxi-single Renjana.',
})

const today = useToday()
const release = releases[0]
const latestShow = computed(() => {
  const played = shows.filter(show => show.date <= today.value)
  return played[played.length - 1] ?? null
})
</script>

<template>
  <div>
    <HeroParallax />
    <AppMarquee />

    <div class="home">
      <section class="manifesto wrap">
        <p class="watermark" aria-hidden="true">2023</p>
        <div class="split">
          <div>
            <p class="kicker">{{ band.location }} · {{ band.formed }}</p>
            <h1>Heavy-Heavy Unit</h1>
          </div>
          <div class="stack">
            <p class="lead">
              Madlit adalah band Rock/Metal, biasa disebut Rock/Metal Heavy-Heavy Unit,
              yang berdiri di Bandung pada tahun 2023. Formasi sekarang: Manray, Alfikri,
              Aria, dan Arya. Ini formasi kedua, setelah sebelumnya berlima.
            </p>
            <NuxtLink to="/bio" class="btn">Baca bio</NuxtLink>
          </div>
        </div>
      </section>

      <section v-if="latestShow" class="show">
        <div class="wrap show-grid">
          <div>
            <p class="kicker">Terakhir tampil</p>
            <h2>{{ latestShow.title }}</h2>
            <p class="where">
              {{ latestShow.venue }}<template v-if="latestShow.city && latestShow.city !== latestShow.venue"> · {{ latestShow.city }}</template>
            </p>
          </div>
          <p v-if="latestShow.dateLabel" class="when">
            <span>{{ latestShow.dateLabel }}</span>
          </p>
          <p v-else class="when">
            <span>{{ formatDay(latestShow.date) }}</span>
            <span>{{ formatMonth(latestShow.date) }}</span>
          </p>
          <NuxtLink to="/live" class="btn">Semua tanggal</NuxtLink>
        </div>
      </section>

      <section v-if="release" class="wrap block">
        <div class="block-head">
          <div>
            <p class="kicker">{{ release.type }} · {{ release.year }}</p>
            <h2>{{ release.title }}</h2>
          </div>
          <NuxtLink :to="`/music/${release.slug}`" class="btn">Detail rilis</NuxtLink>
        </div>
        <p class="lead">{{ release.summary }}</p>
        <ol class="songs">
          <li v-for="(track, index) in release.tracks" :key="track.title">
            <span>0{{ index + 1 }}</span>
            <span>{{ track.title }}</span>
          </li>
        </ol>
        <PlatformLinks :links="release.links" />
      </section>

      <section class="wrap block">
        <div class="block-head">
          <div>
            <p class="kicker">Formasi kedua</p>
            <h2>Empat personil</h2>
          </div>
        </div>
        <ol class="roles">
          <li v-for="member in members" :key="member.name">
            <h3>{{ member.name }}</h3>
            <p>{{ member.role }}</p>
          </li>
        </ol>
      </section>

      <section class="wrap block">
        <div class="block-head">
          <div>
            <p class="kicker">2023–2026</p>
            <h2>Tiga tahun panggung</h2>
          </div>
          <NuxtLink to="/bio" class="btn">Cerita lengkap</NuxtLink>
        </div>
        <p class="lead">
          Debut tahun 2023 harus bertandang ke Cianjur. Setelah itu ada festival kampus
          di Unisba, ISBI, dan Itenas, plus acara kolektif. Sejak tulisan profil ini dibuat,
          Madlit terakhir tampil di Outcast Alliance.
        </p>
      </section>

      <section class="book">
        <div class="wrap book-inner">
          <p class="kicker">Informasi lebih lengkap</p>
          <h2>Hubungi kami</h2>
          <div class="channels">
            <a class="btn" :href="band.instagramUrl" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a class="btn" :href="band.whatsappUrl" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a class="btn btn-fill" :href="`mailto:${band.email}`">Email</a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.home {
  position: relative;
  z-index: 2;
  background: var(--bg);
}

.manifesto {
  position: relative;
  padding: 5.5rem 0 4rem;
  overflow: hidden;
}

.watermark {
  position: absolute;
  top: -0.18em;
  right: -0.06em;
  margin: 0;
  color: transparent;
  font-family: var(--display);
  font-size: clamp(8rem, 26vw, 18rem);
  line-height: 0.8;
  pointer-events: none;
  user-select: none;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.16);
}

h1,
h2 {
  font-family: var(--display);
  font-weight: 400;
  letter-spacing: 0.02em;
  line-height: 0.86;
  text-transform: uppercase;
}

h1 {
  max-width: 12ch;
  font-size: clamp(3.6rem, 8vw, 6.4rem);
}

h2 {
  font-size: clamp(2.8rem, 6vw, 4.8rem);
}

.show {
  background: #000;
  border-block: 1px solid var(--line);
}

.show-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  gap: 2rem;
  align-items: center;
  padding: 2.4rem 0;
}

.where {
  margin-top: 0.6rem;
  color: var(--muted);
}

.when {
  display: grid;
  justify-items: end;
  margin: 0;
  font-family: var(--display);
  line-height: 0.8;
  text-transform: uppercase;
}

.when span:first-child {
  font-size: clamp(3.2rem, 14vw, 5.5rem);
}

.when span:last-child {
  color: var(--red);
  font-size: 1.8rem;
  letter-spacing: 0.08em;
}

.block {
  padding: 4.5rem 0 0;
}

.block-head {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  justify-content: space-between;
  gap: 1rem 1.5rem;
  margin-bottom: 1.5rem;
}

.block-head > div {
  min-width: 0;
}

.roles {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.8rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.roles li {
  min-height: 100%;
  padding: 1.1rem;
  background: #000;
  border: 1px solid var(--line);
}

.roles h3 {
  font-family: var(--display);
  font-size: 2.2rem;
  font-weight: 400;
  letter-spacing: 0.04em;
  line-height: 0.9;
  text-transform: uppercase;
}

.roles p {
  margin-top: 0.7rem;
  color: var(--muted);
}

.lead {
  max-width: 44rem;
}

.songs {
  max-width: 32rem;
  margin: 1.4rem 0 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--line);
}

.songs li {
  display: grid;
  grid-template-columns: 3rem 1fr;
  gap: 1rem;
  padding: 0.9rem 0;
  border-bottom: 1px solid var(--line);
  font-family: var(--display);
  font-size: 2rem;
  letter-spacing: 0.04em;
  line-height: 1;
  text-transform: uppercase;
}

.songs li span:first-child {
  color: var(--red);
}

.channels {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.book {
  margin-top: 4.5rem;
  background:
    linear-gradient(90deg, rgba(255, 36, 36, 0.16), transparent 42%),
    #000;
  border-block: 1px solid var(--line);
}

.book-inner {
  display: grid;
  justify-items: start;
  gap: 1rem;
  padding: 4rem 0;
}

@media (max-width: 900px) {
  .roles {
    grid-template-columns: 1fr 1fr;
  }

  .show-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .when {
    justify-items: start;
  }
}

@media (max-width: 640px) {
  .manifesto {
    padding: 3rem 0 2.4rem;
  }

  .roles,
  .block-head {
    grid-template-columns: 1fr;
    display: grid;
  }

  .block {
    padding-top: 3rem;
  }

  .book {
    margin-top: 3rem;
  }

  .book-inner {
    padding: 2.5rem 0;
  }

  h1 {
    font-size: clamp(2.6rem, 12vw, 3.6rem);
  }

  h2 {
    font-size: clamp(2.15rem, 10vw, 2.8rem);
  }

  .songs li {
    font-size: 1.6rem;
  }
}
</style>
