<script setup lang="ts">
import type { NuxtError } from '#app'
import { assets } from '~/data/band'

defineProps<{
  error: NuxtError
}>()

function goHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <main class="miss">
    <button type="button" class="brand" aria-label="MADLIT, ke beranda" @click="goHome">
      <img :src="assets.logo" alt="" width="900" height="900">
    </button>
    <p class="code">{{ error.statusCode }}</p>
    <h1>{{ error.statusMessage || 'Halaman tidak ada' }}</h1>
    <button type="button" class="btn btn-fill" @click="goHome">Kembali ke home</button>
  </main>
</template>

<style scoped>
.miss {
  min-height: 100vh;
  display: grid;
  align-content: center;
  justify-items: start;
  gap: 0.8rem;
  width: min(760px, calc(100% - 2.5rem));
  margin: 0 auto;
}

.brand {
  display: block;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.brand img {
  display: block;
  width: auto;
  height: 7.5rem;
  object-fit: contain;
}

.code {
  margin: 0.6rem 0 0;
  color: var(--red);
  font-family: var(--display);
  font-size: 1.4rem;
  letter-spacing: 0.14em;
}

h1 {
  font-family: var(--display);
  font-size: clamp(3rem, 8vw, 5.5rem);
  font-weight: 400;
  letter-spacing: 0.03em;
  line-height: 0.88;
  text-transform: uppercase;
}
</style>
