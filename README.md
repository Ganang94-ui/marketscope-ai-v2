# MarketScope AI

Dashboard riset dan analisis marketplace lintas platform. Tahap pertama berisi MVP dashboard interaktif dengan data simulasi.

## Fitur tahap pertama
- Dashboard ringkasan metrik marketplace
- Filter marketplace: Semua, Shopee, TikTok Shop, Tokopedia
- Pilihan periode analisis
- Grafik aktivitas pasar dan kategori populer
- Tabel produk contoh dengan pencarian
- Layout responsif desktop dan mobile

> **Penting:** Seluruh angka pada MVP ini adalah data simulasi untuk preview UI. Belum ada koneksi API marketplace atau data penjualan aktual.

## Teknologi
- Next.js 15 + React 19
- TypeScript
- Tailwind CSS
- Recharts
- Lucide React

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

## Struktur

```text
marketscope-ai/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## Roadmap
1. MVP dashboard (current)
2. Product research + CSV import
3. Backend FastAPI + PostgreSQL
4. Integrasi sumber data resmi/berizin
5. AI insight dan kalkulator profit
