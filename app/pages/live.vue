<script setup lang="ts">
import { shows } from '~/data/band'

useSeoMeta({
  title: 'Live',
  description: 'Portfolio panggung Madlit, dari debut di Cianjur pada 2023 sampai Outcast Alliance.',
})

const today = useToday()
const upcoming = computed(() => shows.filter(show => show.date >= today.value))
const past = computed(() => shows.filter(show => show.date < today.value).slice().reverse())
</script>

<template>
  <article class="page">
    <div class="wrap">
      <PageIntro
        kicker="Panggung"
        title="Live"
        lead="Dari 2023 sampai 2026: debut di Cianjur, festival kampus, acara kolektif, dan yang terakhir Outcast Alliance."
      />

      <section v-if="upcoming.length">
        <h2>Berikutnya</h2>
        <ol class="dates">
          <li v-for="show in upcoming" :key="`${show.date}-${show.title}`">
            <p class="when">
              <span v-if="show.dateLabel">{{ show.dateLabel }}</span>
              <template v-else>
                <span>{{ formatDay(show.date) }}</span>
                <span>{{ formatMonth(show.date) }} {{ show.date.slice(0, 4) }}</span>
              </template>
            </p>
            <div>
              <h3>{{ show.title }}</h3>
              <p>{{ show.venue }}<template v-if="show.city && show.city !== show.venue"> · {{ show.city }}</template></p>
            </div>
          </li>
        </ol>
      </section>

      <section v-if="past.length" :class="{ past: upcoming.length > 0 }">
        <h2>Portfolio panggung</h2>
        <ol class="dates">
          <li v-for="show in past" :key="`${show.date}-${show.title}`">
            <p class="when">
              <span v-if="show.dateLabel">{{ show.dateLabel }}</span>
              <template v-else>
                <span>{{ formatDay(show.date) }}</span>
                <span>{{ formatMonth(show.date) }} {{ show.date.slice(0, 4) }}</span>
              </template>
            </p>
            <div>
              <h3>{{ show.title }}</h3>
              <p>{{ show.venue }}<template v-if="show.city && show.city !== show.venue"> · {{ show.city }}</template></p>
            </div>
          </li>
        </ol>
      </section>
    </div>
  </article>
</template>

<style scoped>
h2 {
  margin-bottom: 0.4rem;
  font-family: var(--display);
  font-size: clamp(2.4rem, 5vw, 3.5rem);
  font-weight: 400;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.dates {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--line);
}

.dates li {
  display: grid;
  grid-template-columns: 8rem 1fr auto;
  gap: 1rem;
  align-items: center;
  padding: 1.15rem 0;
  border-bottom: 1px solid var(--line);
}

.when {
  display: grid;
  margin: 0;
  font-family: var(--display);
  line-height: 0.85;
  text-transform: uppercase;
}

.when span:first-child {
  font-size: 3rem;
}

.when span:last-child {
  color: var(--red);
  letter-spacing: 0.06em;
}

h3 {
  font-family: var(--display);
  font-size: clamp(1.7rem, 5vw, 2.4rem);
  font-weight: 400;
  letter-spacing: 0.03em;
  line-height: 0.95;
  text-transform: uppercase;
}

.dates li > div p {
  margin-top: 0.25rem;
  color: var(--muted);
}

.past {
  margin-top: 3.5rem;
  opacity: 0.72;
}

@media (max-width: 860px) {
  .dates li {
    grid-template-columns: 1fr;
    gap: 0.35rem;
  }

  .when span:first-child {
    font-size: clamp(2.2rem, 12vw, 3rem);
  }
}
</style>
