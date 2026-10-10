<script setup lang="ts">
import { assets, band, nav } from '~/data/band'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="wrap grid">
      <div>
        <img class="mark" :src="assets.logo" alt="MADLIT" width="900" height="900">
        <p class="slogan">{{ band.slogan }}</p>
        <p class="tag">{{ band.tag }}</p>
      </div>

      <nav aria-label="Kaki">
        <NuxtLink v-for="item in nav" :key="item.to" :to="item.to">{{ item.label }}</NuxtLink>
      </nav>

      <div>
        <p class="kicker">Booking</p>
        <a class="mail" :href="`mailto:${band.email}`">{{ band.email }}</a>
        <p class="where">{{ band.location }}</p>
      </div>
    </div>
    <div class="wrap legal">
      <span>© {{ year }} {{ band.name }}</span>
      <span>Underground metal</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 3.5rem 0 1.5rem;
  background: #000;
  border-top: 1px solid var(--line);
}

.grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 2rem;
}

.mark {
  display: block;
  width: 11rem;
  height: auto;
  object-fit: contain;
}

.slogan {
  margin-top: 0.8rem;
  font-family: var(--display);
  font-size: clamp(1.6rem, 4vw, 2rem);
  letter-spacing: 0.04em;
  line-height: 0.9;
}

.tag,
.where {
  margin-top: 0.45rem;
  color: var(--muted);
}

nav {
  display: grid;
  align-content: start;
  gap: 0.35rem;
}

nav a {
  font-family: var(--display);
  font-size: 1.6rem;
  letter-spacing: 0.06em;
  text-decoration: none;
  text-transform: uppercase;
}

nav a:hover {
  color: var(--red);
}

.mail {
  display: inline-block;
  max-width: 100%;
  font-family: var(--display);
  font-size: clamp(1.2rem, 4vw, 1.7rem);
  letter-spacing: 0.04em;
  line-height: 1.1;
  overflow-wrap: anywhere;
  text-decoration: none;
}

.mail:hover {
  color: var(--red);
}

.legal {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--line);
  color: var(--faint);
  font-size: 0.92rem;
}

@media (max-width: 900px) {
  .grid,
  .legal {
    grid-template-columns: 1fr;
    display: grid;
  }
}
</style>
