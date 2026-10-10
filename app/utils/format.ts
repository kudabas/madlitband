export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatDay(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('id-ID', {
    day: '2-digit',
  })
}

export function formatMonth(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('id-ID', {
    month: 'short',
  }).replace('.', '')
}
