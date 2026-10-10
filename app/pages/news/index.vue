<script setup lang="ts">
import { news } from '~/data/band'

useSeoMeta({
  title: 'Berita',
  description: 'Kabar rilis, jadwal, dan poster MADLIT.',
})
</script>

<template>
  <article class="page">
    <div class="wrap">
      <PageIntro
        kicker="Kabar"
        title="Berita"
        lead="Rilis, tanggal panggung, dan artwork. Singkat, seperti setlist."
      />

      <div class="rule-list">
        <NuxtLink v-for="article in news" :key="article.slug" :to="`/news/${article.slug}`">
          <span class="rule-meta">{{ formatDate(article.date) }}</span>
          <span>
            <span class="rule-title">{{ article.title }}</span>
            <span class="excerpt">{{ article.excerpt }}</span>
          </span>
          <span class="rule-meta">Baca</span>
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<style scoped>
.rule-list a {
  grid-template-columns: 11rem 1fr auto;
  align-items: start;
}

.excerpt {
  display: block;
  margin-top: 0.4rem;
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
