<script setup lang="ts">
defineProps<{
  kicker: string
  title: string
  lead?: string
}>()
</script>

<template>
  <header class="intro">
    <p class="kicker">{{ kicker }}</p>
    <h1>{{ title }}</h1>
    <p v-if="lead" class="lead">{{ lead }}</p>
  </header>
</template>

<style scoped>
.intro {
  display: grid;
  gap: 0.8rem;
  margin-bottom: 3rem;
}

h1 {
  max-width: 14ch;
  font-family: var(--display);
  font-size: clamp(3rem, 14vw, 7.4rem);
  font-weight: 400;
  letter-spacing: 0.02em;
  line-height: 0.84;
  text-transform: uppercase;
}

@media (max-width: 640px) {
  .intro {
    margin-bottom: 2rem;
  }
}
</style>
