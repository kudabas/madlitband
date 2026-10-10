<script setup lang="ts">
const text = 'Lust for metal — Cry for battle — 666% rock/metal — Heavy heavy unit —'
</script>

<template>
  <div class="marquee" aria-hidden="true">
    <div class="track">
      <span v-for="copy in 2" :key="copy">
        <span v-for="n in 4" :key="n">{{ text }}</span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  overflow: hidden;
  background: #000;
  border-block: 1px solid var(--line);
  color: #fff;
}

.track {
  display: flex;
  width: max-content;
  animation: ticker 32s linear infinite;
}

.track span {
  padding: 0.72rem 0;
  font-family: var(--display);
  font-size: 1.45rem;
  letter-spacing: 0.12em;
  line-height: 1;
  text-transform: uppercase;
  white-space: pre;
}

@keyframes ticker {
  to {
    transform: translateX(-50%);
  }
}

@media (max-width: 640px) {
  .track span {
    font-size: 1.15rem;
    letter-spacing: 0.08em;
  }
}

@media (prefers-reduced-motion: reduce) {
  .track {
    animation: none;
  }
}
</style>
