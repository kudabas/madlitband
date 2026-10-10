<script setup lang="ts">
import { band, formerMembers, members, releases } from '~/data/band'

useSeoMeta({
  title: 'Bio',
  description: 'Madlit berdiri di Bandung pada 2023. Formasi sekarang: Manray, Alfikri, Aria, dan Arya.',
})

const release = releases[0]
</script>

<template>
  <article class="page">
    <div class="wrap">
      <PageIntro
        kicker="Bandung · 2023"
        title="Bio"
        lead="Madlit adalah band dengan genre Rock/Metal, atau biasa disebut Rock/Metal Heavy-Heavy Unit, yang berdiri di Bandung pada tahun 2023."
      />

      <div class="split body">
        <div class="prose">
          <p>
            Formasi sekarang adalah <strong>Manray</strong> (vokal), <strong>Alfikri</strong> (gitar),
            <strong>Aria</strong> (drum), dan <strong>Arya</strong> (bass). Ini formasi kedua,
            setelah sebelumnya berlima.
          </p>
          <p>
            Formasi pertama berisikan Arya (gitar), Alfikri (gitar), Manray (vokal), Fajri (bass),
            dan Adi (drum). Kami semua lahir dari tongkrongan semasa kuliah dan spirit bermusik.
            Fajri dan Adi memilih untuk beristirahat setelah masa kuliah usai, sehingga posisi drum
            diisi oleh Aria, dan bass oleh Arya yang bergeser dari gitar.
          </p>
        </div>

        <dl class="facts">
          <div>
            <dt>Genre</dt>
            <dd>{{ band.genre }}</dd>
          </div>
          <div>
            <dt>Basis</dt>
            <dd>{{ band.location }}</dd>
          </div>
          <div>
            <dt>Berdiri</dt>
            <dd>{{ band.formed }}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd><a :href="`mailto:${band.email}`">{{ band.email }}</a></dd>
          </div>
          <div>
            <dt>Instagram</dt>
            <dd><a :href="band.instagramUrl" target="_blank" rel="noopener noreferrer">@{{ band.instagram }}</a></dd>
          </div>
          <div>
            <dt>WhatsApp</dt>
            <dd><a :href="band.whatsappUrl" target="_blank" rel="noopener noreferrer">{{ band.whatsapp }}</a></dd>
          </div>
        </dl>
      </div>

      <section class="unit">
        <p class="kicker">Sekarang</p>
        <h2>Formasi kedua</h2>
        <ol>
          <li v-for="member in members" :key="`${member.name}-${member.role}`">
            <p class="kicker">{{ member.role }}</p>
            <h3>{{ member.name }}</h3>
          </li>
        </ol>
      </section>

      <section class="unit">
        <p class="kicker">Sebelumnya</p>
        <h2>Formasi pertama</h2>
        <p class="note">Lima personil, dari tongkrongan kuliah.</p>
        <ol>
          <li v-for="member in formerMembers" :key="`${member.name}-${member.role}`">
            <p class="kicker">{{ member.role }}</p>
            <h3>{{ member.name }}</h3>
          </li>
        </ol>
      </section>

      <section v-if="release" class="unit">
        <p class="kicker">{{ release.type }} · akhir Maret {{ release.year }}</p>
        <h2>{{ release.title }}</h2>
        <div class="prose">
          <p>
            Di tahun 2026 Madlit merilis maxi-single Renjana, berisi Samsara dan Renjana.
            Ini anak kembar pertama setelah proses panjang, dari rekaman sampai lagu yang
            sebenarnya sudah selesai sejak 2025.
          </p>
          <p>
            Renjana dibuat ketika Madlit masih bersama formasi lama, yaitu Fajri di bass
            dan Adi di drum. Artwork dikerjakan semaksimal mungkin, sehingga rilis tertunda
            sampai akhir Maret 2026. Maxi-single ini bisa didengarkan di semua platform musik digital.
          </p>
        </div>
        <PlatformLinks :links="release.links" />
      </section>

      <section class="unit">
        <p class="kicker">2023–2026</p>
        <h2>Panggung</h2>
        <div class="prose">
          <p>
            Tiga tahun berlalu, dan beberapa pertunjukan sudah dilewati. Debut 2023 harus
            bertandang ke Cianjur, lalu ada festival kampus di Unisba, ISBI, dan Itenas,
            juga berbagai acara kolektif.
          </p>
          <p>
            Sejak tulisan profil ini dibuat, Madlit terakhir tampil di Outcast Alliance.
          </p>
        </div>
        <NuxtLink to="/live" class="btn">Lihat tanggal</NuxtLink>
      </section>
    </div>
  </article>
</template>

<style scoped>
.body {
  align-items: start;
}

.facts {
  display: grid;
  gap: 0;
  margin: 0;
  border-top: 1px solid var(--line);
}

.facts div {
  display: grid;
  gap: 0.15rem;
  padding: 0.9rem 0;
  border-bottom: 1px solid var(--line);
}

dt {
  color: var(--faint);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

dd {
  margin: 0;
  font-family: var(--display);
  font-size: clamp(1.35rem, 2vw, 1.8rem);
  letter-spacing: 0.03em;
  line-height: 1.05;
}

dd a {
  text-decoration: none;
}

dd a:hover {
  color: var(--red);
}

.unit {
  margin-top: 4.5rem;
}

h2,
h3 {
  font-family: var(--display);
  font-weight: 400;
  letter-spacing: 0.03em;
  line-height: 0.9;
  text-transform: uppercase;
}

h2 {
  font-size: clamp(2.3rem, 10vw, 5.5rem);
}

.note {
  margin: 0.7rem 0 1.4rem;
}

.unit .btn {
  margin-top: 1.4rem;
}

.facts dd {
  overflow-wrap: anywhere;
}

ol {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  padding: 1.15rem;
  background: #000;
  border: 1px solid var(--line);
}

h3 {
  font-size: clamp(2rem, 6vw, 2.6rem);
}

li p:last-child {
  margin-top: 0.55rem;
  color: var(--muted);
}

@media (max-width: 700px) {
  ol {
    grid-template-columns: 1fr;
  }

  .unit {
    margin-top: 3rem;
  }
}
</style>
