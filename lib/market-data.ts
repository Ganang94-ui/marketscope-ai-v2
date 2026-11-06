
export type Marketplace =
  | 'Shopee'
  | 'TikTok Shop'
  | 'Tokopedia';

export type CompetitionLevel =
  | 'Rendah'
  | 'Sedang'
  | 'Tinggi';

export interface ProductResearchItem {
  id: number;
  name: string;
  category: string;
  marketplace: Marketplace;
  price: number;
  estimatedCost: number;
  monthlySales: number;
  growth: number;
  searchTrend: number;
  competition: CompetitionLevel;
}

export const mockProducts: ProductResearchItem[] = [
  {
    id: 1,
    name: 'Tas Selempang Wanita Minimalis',
    category: 'Fashion',
    marketplace: 'Shopee',
    price: 89000,
    estimatedCost: 42000,
    monthlySales: 1850,
    growth: 32.8,
    searchTrend: 88,
    competition: 'Sedang',
  },
  {
    id: 2,
    name: 'Serum Wajah Niacinamide 10%',
    category: 'Beauty',
    marketplace: 'TikTok Shop',
    price: 45000,
    estimatedCost: 21000,
    monthlySales: 3200,
    growth: 24.5,
    searchTrend: 95,
    competition: 'Tinggi',
  },
  {
    id: 3,
    name: 'Rak Dapur Multifungsi',
    category: 'Rumah Tangga',
    marketplace: 'Tokopedia',
    price: 72500,
    estimatedCost: 35000,
    monthlySales: 980,
    growth: 18.2,
    searchTrend: 72,
    competition: 'Rendah',
  },
  {
    id: 4,
    name: 'Botol Minum Tumbler 1L',
    category: 'Lifestyle',
    marketplace: 'Shopee',
    price: 39900,
    estimatedCost: 18000,
    monthlySales: 2400,
    growth: 15.7,
    searchTrend: 79,
    competition: 'Tinggi',
  },
  {
    id: 5,
    name: 'Lampu Tidur LED Minimalis',
    category: 'Elektronik',
    marketplace: 'Tokopedia',
    price: 65000,
    estimatedCost: 27000,
    monthlySales: 1250,
    growth: 28.4,
    searchTrend: 84,
    competition: 'Rendah',
  },
  {
    id: 6,
    name: 'Organizer Makeup Portable',
    category: 'Beauty',
    marketplace: 'Shopee',
    price: 55000,
    estimatedCost: 23000,
    monthlySales: 1600,
    growth: 21.6,
    searchTrend: 81,
    competition: 'Sedang',
  },
  {
    id: 7,
    name: 'Kemeja Casual Pria',
    category: 'Fashion',
    marketplace: 'TikTok Shop',
    price: 79000,
    estimatedCost: 39000,
    monthlySales: 2100,
    growth: 12.5,
    searchTrend: 75,
    competition: 'Tinggi',
  },
  {
    id: 8,
    name: 'Rak Penyimpanan Lipat',
    category: 'Rumah Tangga',
    marketplace: 'Tokopedia',
    price: 95000,
    estimatedCost: 43000,
    monthlySales: 750,
    growth: 35.2,
    searchTrend: 91,
    competition: 'Rendah',
  },
];

export function calculatePotentialScore(
  product: ProductResearchItem
): number {
  const growthScore = Math.min(
    Math.max(product.growth * 2, 0),
    100
  );

  const demandScore = Math.min(
    (product.monthlySales / 3000) * 100,
    100
  );

  const competitionScore = {
    Rendah: 100,
    Sedang: 65,
    Tinggi: 30,
  }[product.competition];

  const score =
    growthScore * 0.35 +
    demandScore * 0.25 +
    product.searchTrend * 0.20 +
    competitionScore * 0.20;

  return Math.round(score);
}

export function getPotentialLabel(score: number): string {
  if (score >= 80) return 'Potensi sangat tinggi';
  if (score >= 65) return 'Potensi tinggi';
  if (score >= 50) return 'Potensi sedang';
  return 'Perlu dianalisis';
}
