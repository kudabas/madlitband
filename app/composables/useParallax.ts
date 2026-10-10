export function useParallax(track: Ref<HTMLElement | null>) {
  const progress = ref(0)
  const reduced = ref(false)
  let frame = 0

  function update() {
    const element = track.value
    if (!element || reduced.value) {
      progress.value = 0
      return
    }

    const total = Math.max(element.offsetHeight - window.innerHeight, 1)
    const passed = Math.min(Math.max(-element.getBoundingClientRect().top, 0), total)
    progress.value = passed / total
  }

  function onScroll() {
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(update)
  }

  onMounted(() => {
    reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
  })

  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
  })

  return { progress, reduced }
}
