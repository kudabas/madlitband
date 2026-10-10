<script setup lang="ts">
const config = useAppConfig()

useHead({
  titleTemplate: (title) => (title ? `${title} · ${config.name}` : config.name),
})
</script>

<template>
  <div class="shell">
    <a class="skip" href="#isi">Lewati ke isi</a>
    <AppHeader />
    <main id="isi">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
