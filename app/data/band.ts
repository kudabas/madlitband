// Konten situs. Ubah formasi, rilis, jadwal, dan berita di berkas ini.

export const assets = {
  flag: '/media/flag.png',
  logo: '/media/logo.png',
  logoLight: '/media/logo-light.png',
}

export const band = {
  name: 'MADLIT',
  genre: 'Rock/Metal Heavy-Heavy Unit',
  location: 'Bandung',
  formed: 2023,
  email: 'madlitband@gmail.com',
  instagram: 'thetruemadlit',
  instagramUrl: 'https://instagram.com/thetruemadlit',
  whatsapp: '085161193329',
  whatsappUrl: 'https://wa.me/6285161193329',
  slogan: 'Lust for metal. Cry for battle.',
  tag: '666% Rock/Metal Heavy Heavy Unit',
}

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/bio', label: 'Bio' },
  { to: '/music', label: 'Musik' },
  { to: '/live', label: 'Live' },
  { to: '/gallery', label: 'Galeri' },
  { to: '/news', label: 'Berita' },
  { to: '/contact', label: 'Kontak' },
] as const

export interface Member {
  role: string
  name: string
  detail: string
}

export const members: Member[] = [
  { role: 'Vokal', name: 'Manray', detail: '' },
  { role: 'Gitar', name: 'Alfikri', detail: '' },
  { role: 'Drum', name: 'Aria', detail: '' },
  { role: 'Bass', name: 'Arya', detail: '' },
]

export const formerMembers: Member[] = [
  { role: 'Gitar', name: 'Arya', detail: '' },
  { role: 'Gitar', name: 'Alfikri', detail: '' },
  { role: 'Vokal', name: 'Manray', detail: '' },
  { role: 'Bass', name: 'Fajri', detail: '' },
  { role: 'Drum', name: 'Adi', detail: '' },
]

export interface Track {
  title: string
  time?: string
}

export interface ReleaseLinks {
  spotify: string
  youtube: string
  bandcamp: string
  apple: string
}

export interface Release {
  slug: string
  title: string
  type: string
  year: number
  released: string
  summary: string
  tracks: Track[]
  links: ReleaseLinks
}

export const releases: Release[] = [
  {
    slug: 'renjana',
    title: 'Renjana',
    type: 'Maxi-Single',
    year: 2026,
    released: '2026-03-31',
    summary: 'Anak kembar pertama Madlit. Lagunya selesai sejak 2025, masih bersama formasi lama, lalu dirilis akhir Maret 2026 setelah artwork dikerjakan sampai selesai. Bisa didengarkan di semua platform musik digital.',
    tracks: [
      { title: 'Samsara' },
      { title: 'Renjana' },
    ],
    links: {
      spotify: '',
      youtube: '',
      bandcamp: '',
      apple: '',
    },
  },
]

export interface Show {
  date: string
  dateLabel?: string
  city: string
  venue: string
  title: string
  note: string
}

export const shows: Show[] = [
  {
    date: '2023-08-06',
    city: 'Cianjur',
    venue: 'GMC Studio',
    title: 'Debut Show — Rekan Akhir Pekan III',
    note: '',
  },
  {
    date: '2023-12-21',
    city: 'Bandung',
    venue: 'Papa Beer Braga',
    title: 'Punk Night',
    note: '',
  },
  {
    date: '2024-05-01',
    dateLabel: 'Mei 2024',
    city: 'Bandung',
    venue: 'Unisba',
    title: 'Fikom Festival 2024',
    note: '',
  },
  {
    date: '2024-11-24',
    city: 'Bandung',
    venue: 'ISBI Bandung',
    title: 'Hura Hura Terror Klab',
    note: '',
  },
  {
    date: '2025-04-21',
    city: 'Bandung',
    venue: 'Basement Itenas',
    title: 'Arsiterra',
    note: '',
  },
  {
    date: '2025-05-04',
    city: 'Bandung',
    venue: 'Unisba',
    title: 'Fikom Festival 2025',
    note: '',
  },
  {
    date: '2025-05-31',
    city: 'Jatinangor',
    venue: 'Bagi Kopi',
    title: 'Beatwave Gigs',
    note: '',
  },
  {
    date: '2025-06-21',
    city: 'Bandung',
    venue: 'Basement Itenas',
    title: 'Gedung Gila',
    note: '',
  },
  {
    date: '2026-06-21',
    city: 'Puntang',
    venue: 'Puntang',
    title: 'Sora Kolektif vol.1',
    note: '',
  },
  {
    date: '2026-08-30',
    city: 'Ranc District',
    venue: 'Ranc District',
    title: 'Outcast Alliance',
    note: '',
  },
]

export interface Article {
  slug: string
  date: string
  title: string
  excerpt: string
  body: string[]
}

export const news: Article[] = [
  {
    slug: 'renjana-rilis',
    date: '2026-03-31',
    title: 'Maxi-single Renjana rilis akhir Maret 2026',
    excerpt: 'Samsara dan Renjana. Anak kembar pertama Madlit, selesai sejak 2025.',
    body: [
      'Di tahun 2026 Madlit merilis maxi-single Renjana. Isinya dua lagu: Samsara dan Renjana.',
      'Lagunya sebenarnya sudah selesai sejak 2025, dibuat ketika formasi masih bersama Fajri di bass dan Adi di drum. Artwork dikerjakan semaksimal mungkin, sehingga rilis baru terjadi di akhir Maret 2026.',
      'Maxi-single ini bisa didengarkan di semua platform musik digital.',
    ],
  },
  {
    slug: 'outcast-alliance',
    date: '2026-08-30',
    title: 'Terakhir tampil di Outcast Alliance',
    excerpt: 'Ranc District, 30 Agustus 2026. Setelah debut Cianjur dan festival kampus.',
    body: [
      'Dari 2023 sampai 2026 Madlit sudah melewati debut di Cianjur, festival di Unisba, ISBI, dan Itenas, serta beberapa acara kolektif.',
      'Sejak profil ini ditulis, penampilan terakhir Madlit adalah Outcast Alliance di Ranc District pada 30 Agustus 2026.',
    ],
  },
]

export interface Shot {
  src: string
  alt: string
  caption: string
  wide?: boolean
}

export const gallery: Shot[] = [
  {
    src: assets.flag,
    alt: 'Poster MADLIT: Lust for Metal, Cry for Battle, 666% Rock/Metal Heavy Heavy Unit',
    caption: 'Poster — Lust for Metal / Cry for Battle',
    wide: true,
  },
  {
    src: assets.logo,
    alt: 'Logo MADLIT',
    caption: 'Logo',
  },
  {
    src: assets.logoLight,
    alt: 'Logo MADLIT pada bidang terang',
    caption: 'Logo, versi terang',
  },
]

export function getRelease(slug: string) {
  return releases.find(item => item.slug === slug)
}

export function getArticle(slug: string) {
  return news.find(item => item.slug === slug)
}
