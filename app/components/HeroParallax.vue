<script setup lang="ts">
import { assets, band } from '~/data/band'

const track = ref<HTMLElement | null>(null)
const { progress, reduced } = useParallax(track)
const tilt = ref({ x: 0, y: 0 })
const finePointer = ref(false)

const fade = computed(() => (reduced.value ? 1 : Math.max(0, 1 - progress.value * 1.7)))

const posterStyle = computed(() => {
  if (reduced.value) return undefined
  const y = progress.value * -130 + tilt.value.y
  const scale = 1 + progress.value * 0.06
  return { transform: `translate3d(${tilt.value.x}px, ${y}px, 0) scale(${scale})` }
})

const bgStyle = computed(() => {
  if (reduced.value) return undefined
  return { transform: `translate3d(${tilt.value.x * -0.4}px, ${progress.value * 110}px, 0) scale(1.18)` }
})

function onMove(event: MouseEvent) {
  if (reduced.value || !finePointer.value) return
  tilt.value = {
    x: (event.clientX / window.innerWidth - 0.5) * 18,
    y: (event.clientY / window.innerHeight - 0.5) * 12,
  }
}

function onLeave() {
  tilt.value = { x: 0, y: 0 }
}

onMounted(() => {
  finePointer.value = window.matchMedia('(pointer: fine)').matches
})
</script>

<template>
  <section
    ref="track"
    class="track"
    @mousemove="onMove"
    @mouseleave="onLeave"
  >
    <div class="sticky">
      <div class="bg" :style="bgStyle" />
      <div class="vignette" />
      <div class="grain" />

      <div class="ticks" :style="{ opacity: fade }" aria-hidden="true">
        <span /><span /><span /><span />
      </div>

      <div class="meta" :style="{ opacity: fade }">
        <span>Est. {{ band.formed }}</span>
        <span>Underground metal</span>
      </div>

      <div class="poster">
        <div class="mover" :style="posterStyle">
          <img
            :src="assets.flag"
            alt="Poster MADLIT. Lust for Metal. Cry for Battle. 666% Rock/Metal Heavy Heavy Unit."
            width="2200"
            height="1467"
            fetchpriority="high"
            decoding="async"
          >
        </div>
      </div>

      <div class="dock" :style="{ opacity: fade }">
        <p>{{ band.location }}</p>
        <div class="actions">
          <NuxtLink to="/music" class="btn btn-fill">Musik</NuxtLink>
          <NuxtLink to="/live" class="btn">Live</NuxtLink>
        </div>
      </div>

      <div class="meter" aria-hidden="true">
        <span :style="{ transform: `scaleX(${progress})` }" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.track {
  height: 180vh;
  background: #000;
}

.sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  background: #000;
}

.bg,
.vignette,
.grain {
  position: absolute;
  inset: -10%;
  pointer-events: none;
}

.bg {
  inset: 0;
  background: url("/media/flag.png") center / contain no-repeat;
  opacity: 0.34;
  will-change: transform;
}

.vignette {
  inset: 0;
  background:
    linear-gradient(#000, transparent 18% 72%, #000),
    radial-gradient(ellipse at center, transparent 30%, #000 76%);
}

.grain {
  inset: 0;
  opacity: 0.2;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
}

.ticks,
.meta,
.poster,
.dock {
  position: absolute;
  z-index: 1;
}

.ticks {
  inset: calc(var(--header) + 0.8rem) 1.25rem 5.2rem;
}

.ticks span {
  position: absolute;
  width: 1.15rem;
  height: 1.15rem;
  border: 1px solid rgba(255, 255, 255, 0.55);
}

.ticks span:nth-child(1) { top: 0; left: 0; border-right: 0; border-bottom: 0; }
.ticks span:nth-child(2) { top: 0; right: 0; border-left: 0; border-bottom: 0; }
.ticks span:nth-child(3) { bottom: 0; left: 0; border-right: 0; border-top: 0; }
.ticks span:nth-child(4) { bottom: 0; right: 0; border-left: 0; border-top: 0; }

.meta,
.dock {
  right: 1.5rem;
  left: 1.5rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: #fff;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.meta {
  top: calc(var(--header) + 1.15rem);
}

.poster {
  inset: calc(var(--header) + 2.4rem) 2.5rem 6.2rem;
  display: grid;
  place-items: center;
}

.mover {
  display: flex;
  align-items: center;
  justify-content: center;
  width: min(980px, 100%);
  max-height: 100%;
  height: 100%;
  will-change: transform;
}

.mover img {
  display: block;
  width: auto;
  max-width: 100%;
  height: auto;
  max-height: 100%;
  object-fit: contain;
}

.dock {
  bottom: 1.35rem;
  align-items: center;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.meter {
  position: absolute;
  z-index: 2;
  right: 0;
  bottom: 0;
  left: 0;
  height: 3px;
  background: #1a1a1a;
}

.meter span {
  display: block;
  width: 100%;
  height: 100%;
  background: var(--red);
  transform-origin: left center;
}

@media (prefers-reduced-motion: reduce) {
  .track {
    height: 100dvh;
  }

  .sticky {
    position: relative;
  }
}

@media (max-width: 720px) {
  .track {
    height: 155vh;
  }

  .ticks {
    display: none;
  }

  .poster {
    inset: calc(var(--header) + 2.8rem) 0.8rem 6.4rem;
  }

  .meta,
  .dock {
    right: 0.9rem;
    left: 0.9rem;
  }

  .dock {
    align-items: stretch;
    flex-direction: column;
  }

  .actions .btn {
    flex: 1 1 auto;
  }

  .meta,
  .dock {
    font-size: 0.72rem;
    letter-spacing: 0.1em;
  }
}

@media (max-width: 720px) and (max-height: 700px) {
  .track {
    height: 135vh;
  }

  .ticks {
    display: none;
  }

  .poster {
    inset: calc(var(--header) + 2.2rem) 0.75rem 5.4rem;
  }
}
</style>
