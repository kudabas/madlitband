<script setup lang="ts">
import { getArticle } from '~/data/band'

const route = useRoute()
const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug
const article = slug ? getArticle(slug) : undefined

if (!article) {
  throw createError({ statusCode: 404, statusMessage: 'Berita tidak ditemukan' })
}

useSeoMeta({
  title: article.title,
  description: article.excerpt,
})
</script>

<template>
  <article v-if="article" class="page">
    <div class="wrap narrow">
      <NuxtLink to="/news" class="back">← Semua berita</NuxtLink>
      <p class="kicker">{{ formatDate(article.date) }}</p>
      <h1>{{ article.title }}</h1>
      <div class="prose">
        <p v-for="(paragraph, index) in article.body" :key="index">{{ paragraph }}</p>
      </div>
    </div>
  </article>
</template>

<style scoped>
.narrow {
  max-width: 760px;
}

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
  margin: 0.35rem 0 1.5rem;
  font-family: var(--display);
  font-size: clamp(2.4rem, 10vw, 5.6rem);
  font-weight: 400;
  letter-spacing: 0.02em;
  line-height: 0.88;
  text-transform: uppercase;
}
</style>
