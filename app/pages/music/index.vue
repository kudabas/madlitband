<script setup lang="ts">
import { releases } from '~/data/band'

useSeoMeta({
  title: 'Musik',
  description: 'Maxi-single Renjana dari Madlit, berisi Samsara dan Renjana. Rilis akhir Maret 2026.',
})
</script>

<template>
  <article class="page">
    <div class="wrap">
      <PageIntro
        kicker="Diskografi"
        title="Musik"
        lead="Maxi-single Renjana, anak kembar pertama Madlit. Berisi Samsara dan Renjana, rilis akhir Maret 2026."
      />

      <div class="rule-list">
        <NuxtLink v-for="release in releases" :key="release.slug" :to="`/music/${release.slug}`">
          <span class="rule-meta">{{ release.year }}</span>
          <span>
            <span class="rule-title">{{ release.title }}</span>
            <span class="summary">{{ release.summary }}</span>
          </span>
          <span class="rule-meta">{{ release.type }} · {{ release.tracks.length }} lagu</span>
        </NuxtLink>
      </div>
      <PlatformLinks v-if="releases[0]" :links="releases[0].links" />
    </div>
  </article>
</template>

<style scoped>
.rule-list a {
  grid-template-columns: 5rem 1fr auto;
  align-items: start;
}

.summary {
  display: block;
  max-width: 38rem;
  margin-top: 0.45rem;
  color: var(--muted);
  font-family: var(--font);
  font-size: 1rem;
  letter-spacing: 0;
  line-height: 1.5;
  text-transform: none;
}

@media (max-width: 900px) {
  .rule-list a {
    grid-template-columns: 1fr;
  }
}
</style>
