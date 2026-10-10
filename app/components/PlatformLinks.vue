<script setup lang="ts">
import type { ReleaseLinks } from '~/data/band'

const props = defineProps<{
  links: ReleaseLinks
}>()

const platforms = [
  { id: 'spotify', label: 'Spotify' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'bandcamp', label: 'Bandcamp' },
  { id: 'apple', label: 'Apple Music' },
] as const

function urlFor(id: typeof platforms[number]['id']) {
  return props.links[id]
}
</script>

<template>
  <div class="platforms">
    <p class="kicker">Dengarkan</p>
    <div class="row">
      <template v-for="platform in platforms" :key="platform.id">
        <a
          v-if="urlFor(platform.id)"
          class="platform"
          :href="urlFor(platform.id)"
          target="_blank"
          rel="noopener noreferrer"
        >
          <PlatformIcon :name="platform.id" />
          <span>{{ platform.label }}</span>
        </a>
        <button
          v-else
          type="button"
          class="platform"
          aria-disabled="true"
          title="Tautan menyusul"
        >
          <PlatformIcon :name="platform.id" />
          <span>{{ platform.label }}</span>
        </button>
      </template>
    </div>
  </div>
</template>

<style scoped>
.platforms {
  margin-top: 1.5rem;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.platform {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  min-height: 2.9rem;
  padding: 0.35rem 0.9rem 0.35rem 0.4rem;
  border: 1px solid var(--line);
  background: #000;
  color: #fff;
  font-family: var(--display);
  font-size: 1.2rem;
  letter-spacing: 0.08em;
  line-height: 1;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
}

.platform[aria-disabled='true'] {
  cursor: default;
}

a.platform:hover {
  border-color: #fff;
  background: #fff;
  color: #000;
}

@media (max-width: 420px) {
  .platform {
    flex: 1 1 calc(50% - 0.6rem);
    justify-content: center;
  }
}
</style>
