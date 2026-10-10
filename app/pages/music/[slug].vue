<script setup lang="ts">
import { getRelease } from '~/data/band'

const route = useRoute()
const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug
const release = slug ? getRelease(slug) : undefined

if (!release) {
  throw createError({ statusCode: 404, statusMessage: 'Rilis tidak ditemukan' })
}

useSeoMeta({
  title: release.title,
  description: release.summary,
})
</script>

<template>
  <article v-if="release" class="page">
    <div class="wrap">
      <NuxtLink to="/music" class="back">← Semua rilis</NuxtLink>
      <p class="kicker">{{ release.type }} · {{ release.year }}</p>
      <h1>{{ release.title }}</h1>
      <p class="lead">{{ release.summary }}</p>
      <p class="note">Rilis {{ formatDate(release.released) }}</p>

      <ol class="tracks">
        <li v-for="(track, index) in release.tracks" :key="track.title">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <span>{{ track.title }}</span>
          <span v-if="track.time">{{ track.time }}</span>
        </li>
      </ol>
      <PlatformLinks :links="release.links" />
    </div>
  </article>
</template>

<style scoped>
.back {
  display: inline-block;
  margin-bottom: 1.5rem;
  color: var(--muted);
  font-size: 0.92rem;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
}

.back:hover {
  color: var(--red);
}

h1 {
  max-width: 12ch;
  margin: 0.3rem 0 1rem;
  font-family: var(--display);
  font-size: clamp(3rem, 14vw, 8rem);
  font-weight: 400;
  letter-spacing: 0.02em;
  line-height: 0.82;
  text-transform: uppercase;
}

.note {
  margin-top: 0.8rem;
}

.tracks {
  max-width: 42rem;
  margin: 2.5rem 0 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--line);
}

.tracks li {
  display: grid;
  grid-template-columns: 3rem 1fr auto;
  gap: 1rem;
  padding: 0.95rem 0;
  border-bottom: 1px solid var(--line);
}

.tracks li span:first-child,
.tracks li span:last-child {
  color: var(--faint);
  font-variant-numeric: tabular-nums;
}
</style>
