export function useToday() {
  return useState('band-today', () => new Date().toISOString().slice(0, 10))
}
