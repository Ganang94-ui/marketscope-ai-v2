
'use client';

import { useMemo, useState } from 'react';
import {
  Activity, ArrowUpRight, Boxes, ChartNoAxesCombined,
  ChevronDown, CircleHelp, Flame, LayoutDashboard,
  Search, Settings2, ShoppingBag, Sparkles, Target,
  TrendingUp,
} from 'lucide-react';

import {
  mockProducts,
  calculatePotentialScore,
  getPotentialLabel,
} from '../lib/market-data';

type Page = 'Overview' | 'Riset Produk';

const money = (value: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);

export default function Dashboard() {
  const [active, setActive] = useState<Page>('Overview');
  const [query, setQuery] = useState('');
  const [platform, setPlatform] = useState('Semua marketplace');
  const [category, setCategory] = useState('Semua kategori');
  const [sort, setSort] = useState('score');

  const categories = [
    'Semua kategori',
    ...Array.from(new Set(mockProducts.map(p => p.category))),
  ];

  const analyzedProducts = useMemo(() => {
    return mockProducts.map(product => ({
      ...product,
      score: calculatePotentialScore(product),
    }));
  }, []);

  const filteredProducts = useMemo(() => {
    return analyzedProducts
      .filter(product =>
        `${product.name} ${product.category}`
          .toLowerCase()
          .includes(query.toLowerCase())
      )
      .filter(product =>
        platform === 'Semua marketplace' ||
        product.marketplace === platform
      )
      .filter(product =>
        category === 'Semua kategori' ||
        product.category === category
      )
      .sort((a, b) => {
        if (sort === 'score') return b.score - a.score;
        if (sort === 'growth') return b.growth - a.growth;
        if (sort === 'price') return a.price - b.price;
        return b.monthlySales - a.monthlySales;
      });
  }, [analyzedProducts, query, platform, category, sort]);

  const averageScore = analyzedProducts.length
    ? Math.round(
        analyzedProducts.reduce((sum, p) => sum + p.score, 0) /
        analyzedProducts.length
      )
    : 0;

  const nav = [
    { label: 'Overview' as Page, icon: LayoutDashboard },
    { label: 'Riset Produk' as Page, icon: Search },
  ];

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            <ChartNoAxesCombined size={21} />
          </div>
          <div>
            <strong>MarketScope<span>AI</span></strong>
            <small>MARKETPLACE INTELLIGENCE</small>
          </div>
        </div>

        <div className="workspace">
          <div className="workspace-avatar">MS</div>
          <div>
            <b>My Workspace</b>
            <small>Free research space</small>
          </div>
          <ChevronDown size={15} />
        </div>

        <div className="nav-label">WORKSPACE</div>
        <nav>
          {nav.map(item => (
            <button
              key={item.label}
              className={`nav-item ${active === item.label ? 'active' : ''}`}
              onClick={() => setActive(item.label)}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
              {item.label === 'Riset Produk' && (
                <span className="nav-new">NEW</span>
              )}
            </button>
          ))}
        </nav>

        <div className="nav-label second-label">PREFERENSI</div>
        <button className="nav-item">
          <Settings2 size={18} />
          <span>Pengaturan</span>
        </button>
        <button className="nav-item">
          <CircleHelp size={18} />
          <span>Pusat Bantuan</span>
        </button>

        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <Sparkles size={19} />
            <b>Unlock MarketScope Pro</b>
            <p>Dapatkan insight lebih dalam dan analisis tanpa batas.</p>
            <button onClick={() => alert('MarketScope Pro segera tersedia.')}>
              Jelajahi Pro
            </button>
          </div>
          <div className="profile">
            <div className="profile-avatar">U</div>
            <div>
              <b>Workspace User</b>
              <small>Free Plan</small>
            </div>
          </div>
        </div>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <span className="breadcrumb">Workspace</span>
            <span className="crumb-slash">/</span>
            <b>{active}</b>
          </div>
          <div className="topbar-right">
            <div className="top-avatar">U</div>
          </div>
        </header>

        <div className="content-wrap">
          <div className="page-heading">
            <div>
              <div className="eyebrow">
                <span className="live-dot" />
                MARKET INTELLIGENCE
              </div>
              <h1>
                {active === 'Overview'
                  ? 'Market Overview'
                  : 'Product Research Engine'}
              </h1>
              <p>
                {active === 'Overview'
                  ? 'Pantau performa dan temukan peluang marketplace.'
                  : 'Temukan produk potensial dengan mesin analisis MarketScope AI.'}
              </p>
            </div>

            <div className="heading-actions">
              <button
                className="button-primary"
                onClick={() => setActive('Riset Produk')}
              >
                <Sparkles size={16} />
                Mulai Riset
              </button>
            </div>
          </div>

          <div className="demo-notice">
            <div className="notice-icon">
              <Activity size={17} />
            </div>
            <div>
              <b>Mode Demo — Sample Data</b>
              <span>
                Semua data produk dan metrik merupakan simulasi untuk
                pengujian mesin analisis, bukan data aktual marketplace.
              </span>
            </div>
            <span className="demo-pill">SIMULASI</span>
          </div>

          {active === 'Overview' ? (
            <>
              <div className="metrics-grid">
                <Metric
                  title="Produk Dianalisis"
                  value={String(mockProducts.length)}
                  icon={Boxes}
                  note="Produk simulasi"
                />
                <Metric
                  title="Rata-rata Skor"
                  value={`${averageScore}/100`}
                  icon={Target}
                  note="Skor potensi"
                />
                <Metric
                  title="Kategori Produk"
                  value={String(categories.length - 1)}
                  icon={ShoppingBag}
                  note="Kategori tersedia"
                />
                <Metric
                  title="Peluang Tinggi"
                  value={String(
                    analyzedProducts.filter(p => p.score >= 65).length
                  )}
                  icon={Flame}
                  note="Skor minimal 65"
                />
              </div>

              <section className="panel products-panel">
                <div className="panel-heading">
                  <div>
                    <h2>Rekomendasi Produk</h2>
                    <p>Produk dengan skor potensi tertinggi</p>
                  </div>
                  <button
                    className="text-link"
                    onClick={() => setActive('Riset Produk')}
                  >
                    Lihat semua <ArrowUpRight size={15} />
                  </button>
                </div>
                <ProductTable products={analyzedProducts.slice().sort(
                  (a, b) => b.score - a.score
                ).slice(0, 4)} />
              </section>
            </>
          ) : (
            <>
              <div className="metrics-grid">
                <Metric
                  title="Total Produk"
                  value={String(filteredProducts.length)}
                  icon={Boxes}
                  note="Sesuai filter"
                />
                <Metric
                  title="Rata-rata Skor"
                  value={`${averageScore}/100`}
                  icon={Target}
                  note="Seluruh data simulasi"
                />
                <Metric
                  title="Pertumbuhan Tertinggi"
                  value={`${Math.max(...mockProducts.map(p => p.growth))}%`}
                  icon={TrendingUp}
                  note="Data simulasi"
                />
                <Metric
                  title="Peluang Tinggi"
                  value={String(
                    analyzedProducts.filter(p => p.score >= 65).length
                  )}
                  icon={Flame}
                  note="Skor minimal 65"
                />
              </div>

              <section className="panel products-panel">
                <div className="panel-heading">
                  <div>
                    <h2>Database Riset Produk</h2>
                    <p>
                      Analisis potensi berdasarkan permintaan,
                      pertumbuhan dan persaingan.
                    </p>
                  </div>
                  <span className="demo-pill">DEMO ENGINE</span>
                </div>

                <div className="table-toolbar">
                  <div className="table-search">
                    <Search size={15} />
                    <input
                      placeholder="Cari nama produk atau kategori..."
                      value={query}
                      onChange={e => setQuery(e.target.value)}
                    />
                  </div>
                  <span className="result-count">
                    {filteredProducts.length} produk ditemukan
                  </span>
                </div>

                <div className="filter-row">
                  <select
                    value={platform}
                    onChange={e => setPlatform(e.target.value)}
                    className="research-select"
                  >
                    <option>Semua marketplace</option>
                    <option>Shopee</option>
                    <option>TikTok Shop</option>
                    <option>Tokopedia</option>
                  </select>

                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="research-select"
                  >
                    {categories.map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>

                  <select
                    value={sort}
                    onChange={e => setSort(e.target.value)}
                    className="research-select"
                  >
                    <option value="score">Skor tertinggi</option>
                    <option value="growth">Pertumbuhan tertinggi</option>
                    <option value="sales">Penjualan tertinggi</option>
                    <option value="price">Harga terendah</option>
                  </select>
                </div>

                <ProductTable products={filteredProducts} />

                {filteredProducts.length === 0 && (
                  <div className="empty-state">
                    Produk tidak ditemukan. Coba ubah filter pencarian.
                  </div>
                )}
              </section>

              <div className="chart-footnote">
                <span className="footnote-dot" />
                Skor merupakan estimasi berdasarkan formula simulasi
                internal MarketScope AI, bukan rekomendasi investasi
                atau jaminan keuntungan.
              </div>
            </>
          )}

          <footer>
            <span>© 2026 MarketScope AI</span>
            <span>Built for smarter commerce</span>
          </footer>
        </div>
      </section>
    </main>
  );
}

function Metric({
  title,
  value,
  icon: Icon,
  note,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  note: string;
}) {
  return (
    <div className="metric-card">
      <div className="metric-top">
        <span>{title}</span>
        <span className="metric-icon">
          <Icon size={18} />
        </span>
      </div>
      <div className="metric-value">{value}</div>
      <div className="metric-bottom">{note}</div>
    </div>
  );
}

function ProductTable({
  products,
}: {
  products: (typeof mockProducts[number] & { score: number })[];
}) {
  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>NAMA PRODUK</th>
            <th>MARKETPLACE</th>
            <th>HARGA</th>
            <th>PENJUALAN/BULAN</th>
            <th>PERTUMBUHAN</th>
            <th>SKOR POTENSI</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>
                <div className="product-name">
                  <div className="product-thumb thumb-purple">
                    <ShoppingBag size={17} />
                  </div>
                  <div>
                    <b>{product.name}</b>
                    <small>{product.category}</small>
                  </div>
                </div>
              </td>
              <td>{product.marketplace}</td>
              <td className="price-cell">{money(product.price)}</td>
              <td>{product.monthlySales.toLocaleString('id-ID')}</td>
              <td>
                <span className="growth">
                  <ArrowUpRight size={14} />
                  {product.growth}%
                </span>
              </td>
              <td>
                <span className={`potential ${
                  product.score >= 80
                    ? 'green'
                    : product.score >= 65
                    ? 'purple'
                    : 'orange'
                }`}>
                  {product.score}/100 · {getPotentialLabel(product.score)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
