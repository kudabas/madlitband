<script setup lang="ts">
defineProps<{
  name: 'spotify' | 'youtube' | 'bandcamp' | 'apple'
}>()
</script>

<template>
  <svg class="icon" viewBox="0 0 32 32" aria-hidden="true">
    <template v-if="name === 'spotify'">
      <circle cx="16" cy="16" r="16" fill="#1DB954" />
      <path d="M8.2 13.2c4.4-1.1 9.1-.8 13.2 1.2" fill="none" stroke="#191414" stroke-width="2" stroke-linecap="round" />
      <path d="M9 17.2c3.5-.8 7.2-.6 10.5 1" fill="none" stroke="#191414" stroke-width="1.8" stroke-linecap="round" />
      <path d="M9.8 20.8c2.6-.5 5.2-.4 7.6.7" fill="none" stroke="#191414" stroke-width="1.6" stroke-linecap="round" />
    </template>
    <template v-else-if="name === 'youtube'">
      <rect width="32" height="32" rx="8" fill="#FF0033" />
      <path d="M13 11.2v9.6l8.2-4.8L13 11.2z" fill="#fff" />
    </template>
    <template v-else-if="name === 'bandcamp'">
      <circle cx="16" cy="16" r="16" fill="#629aa9" />
      <path d="M10.2 22.2 14.4 9.8h3.2l4.4 12.4h-2.7l-.8-2.5h-4.6l-.8 2.5h-2.9zm4.2-4.4h3.1l-1.5-4.4-1.6 4.4z" fill="#fff" />
    </template>
    <template v-else>
      <rect width="32" height="32" rx="7" fill="#FA243C" />
      <path fill="#fff" d="M21.7 16.6c0-2.2 1.8-3.3 1.9-3.3-1-1.5-2.7-1.7-3.2-1.7-1.4-.1-2.7.8-3.4.8-.7 0-1.8-.8-2.9-.8-1.5 0-2.9.9-3.6 2.2-1.6 2.7-.4 6.7 1.1 8.9.7 1.1 1.6 2.3 2.8 2.2 1.1 0 1.5-.7 2.9-.7s1.7.7 2.9.7 2-.1 2.7-2.2c.8-1.2 1.1-2.4 1.1-2.4s-2.3-.9-2.3-3.7z" />
      <path fill="#fff" d="M19.6 9.4c.6-.8 1-1.8.9-2.9-1 .1-2 .6-2.6 1.4-.6.7-1.1 1.8-.9 2.8 1 .1 2-.5 2.6-1.3z" />
    </template>
  </svg>
</template>

<style scoped>
.icon {
  display: block;
  width: 1.7rem;
  height: 1.7rem;
  flex: none;
}
</style>
