<script setup lang="ts">
import { nav, assets } from '~/data/band'

const route = useRoute()
const open = ref(false)

function isActive(to: string) {
  if (to === '/') return route.path === '/'
  return route.path === to || route.path.startsWith(`${to}/`)
}

function onKey(event: KeyboardEvent) {
  if (event.key === 'Escape') open.value = false
}

watch(() => route.path, () => {
  open.value = false
})

watch(open, (value) => {
  if (!import.meta.client) return
  document.body.style.overflow = value ? 'hidden' : ''
})

onMounted(() => window.addEventListener('keydown', onKey))

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <header class="header" :class="{ 'is-open': open }">
    <NuxtLink to="/" class="brand" aria-label="MADLIT, ke beranda">
      <img :src="assets.logo" alt="" width="900" height="900">
    </NuxtLink>

    <nav class="nav" aria-label="Utama">
      <NuxtLink
        v-for="item in nav"
        :key="item.to"
        :to="item.to"
        :class="{ active: isActive(item.to) }"
        :aria-current="isActive(item.to) ? 'page' : undefined"
      >
        {{ item.label }}
      </NuxtLink>
    </nav>

    <div class="tools">
      <NuxtLink to="/contact" class="btn btn-fill booking">Booking</NuxtLink>
      <button
        type="button"
        class="menu"
        :aria-expanded="open"
        aria-controls="site-menu"
        @click="open = !open"
      >
        {{ open ? 'Tutup' : 'Menu' }}
      </button>
    </div>

    <div v-show="open" id="site-menu" class="panel">
      <nav aria-label="Seluler">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          :class="{ active: isActive(item.to) }"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  z-index: 40;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header);
  padding: 0 max(1rem, env(safe-area-inset-right)) 0 max(1rem, env(safe-area-inset-left));
  background: #000;
  border-bottom: 1px solid var(--line);
}

.brand {
  position: relative;
  z-index: 2;
  display: block;
  height: calc(var(--header) - 0.85rem);
}

.brand img {
  display: block;
  width: auto;
  height: 100%;
  object-fit: contain;
}

.nav {
  display: flex;
  gap: 1.15rem;
}

.nav a,
.panel a {
  color: #ddd8d1;
  font-family: var(--display);
  font-size: 1.35rem;
  letter-spacing: 0.08em;
  line-height: 1;
  text-decoration: none;
  text-transform: uppercase;
}

.nav a:hover,
.panel a:hover,
.nav a.active,
.panel a.active {
  color: var(--red);
}

.tools {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.booking {
  min-height: 2.4rem;
  padding-inline: 0.85rem;
  font-size: 1.15rem;
}

.menu {
  display: none;
  min-height: 2.4rem;
  padding: 0 0.2rem;
  border: 0;
  background: transparent;
  font-family: var(--display);
  font-size: 1.35rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
}

.panel {
  position: fixed;
  z-index: 1;
  inset: var(--header) 0 0;
  display: grid;
  align-content: start;
  padding: 1.25rem max(1rem, env(safe-area-inset-right)) max(1.5rem, env(safe-area-inset-bottom)) max(1rem, env(safe-area-inset-left));
  background: #000;
  overflow: auto;
}

.panel nav {
  display: grid;
}

.panel a {
  padding: 0.35rem 0;
  border-bottom: 1px solid var(--line);
  font-size: clamp(2.6rem, 10vw, 4.5rem);
}

@media (max-width: 1100px) {
  .nav,
  .booking {
    display: none;
  }

  .menu {
    display: inline-flex;
    align-items: center;
  }
}
</style>
