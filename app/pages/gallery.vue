<script setup lang="ts">
import { gallery, type Shot } from '~/data/band'

useSeoMeta({
  title: 'Galeri',
  description: 'Logo dan poster MADLIT.',
})

const dialog = ref<HTMLDialogElement | null>(null)
const active = ref<Shot | null>(null)

function openShot(shot: Shot) {
  active.value = shot
  nextTick(() => dialog.value?.showModal())
}

function close() {
  dialog.value?.close()
}

function onBackdrop(event: MouseEvent) {
  if (event.target === dialog.value) close()
}
</script>

<template>
  <article class="page">
    <div class="wrap">
      <PageIntro
        kicker="Artwork"
        title="Galeri"
        lead="Logo dan poster. Hitam, putih, merah. Belum ada foto panggung yang disimpan di sini."
      />

      <div class="grid">
        <button
          v-for="shot in gallery"
          :key="shot.src"
          type="button"
          class="shot"
          :class="{ wide: shot.wide }"
          @click="openShot(shot)"
        >
          <img :src="shot.src" :alt="shot.alt">
          <span>{{ shot.caption }}</span>
        </button>
      </div>
    </div>

    <dialog ref="dialog" class="lightbox" @click="onBackdrop" @close="active = null">
      <button type="button" class="btn" @click="close">Tutup</button>
      <img v-if="active" :src="active.src" :alt="active.alt">
      <p v-if="active">{{ active.caption }}</p>
    </dialog>
  </article>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.shot {
  display: grid;
  gap: 0.55rem;
  padding: 0;
  border: 0;
  background: transparent;
  text-align: left;
  cursor: pointer;
}

.shot.wide {
  grid-column: span 2;
}

.shot img {
  width: 100%;
  height: auto;
  background: #000;
  border: 1px solid var(--line);
}

.shot span {
  color: var(--muted);
  font-size: 0.92rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.shot:hover img {
  border-color: var(--red);
}

.lightbox {
  width: min(980px, calc(100vw - 1.5rem));
  max-width: calc(100vw - 1.5rem);
  max-height: calc(100dvh - 1.5rem);
  margin: auto;
  padding: 1rem;
  overflow: auto;
  border: 1px solid var(--line);
  background: #000;
  color: #fff;
}

.lightbox::backdrop {
  background: rgba(0, 0, 0, 0.86);
}

.lightbox img {
  display: block;
  width: 100%;
  height: auto;
  margin-top: 0.8rem;
}

.lightbox p {
  margin-top: 0.7rem;
  color: var(--muted);
}

@media (max-width: 700px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .shot.wide {
    grid-column: auto;
  }
}
</style>
