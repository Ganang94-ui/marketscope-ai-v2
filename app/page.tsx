'use client';

import { useState } from 'react';
import {
  Activity, ArrowDownRight, ArrowUpRight, Bell, Boxes, ChartNoAxesCombined,
  ChevronDown, CircleHelp, Command, Download, ExternalLink, Filter, Flame,
  LayoutDashboard, Lightbulb, Menu, Search, Settings2, ShoppingBag,
  Sparkles, Target, TrendingUp, Wallet, X
} from 'lucide-react';
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
  BarChart, Bar
} from 'recharts';

const salesData = [
  { day: '01 Nov', sales: 18, orders: 12 }, { day: '04 Nov', sales: 24, orders: 16 },
  { day: '07 Nov', sales: 21, orders: 14 }, { day: '10 Nov', sales: 33, orders: 22 },
  { day: '13 Nov', sales: 29, orders: 19 }, { day: '16 Nov', sales: 41, orders: 28 },
  { day: '19 Nov', sales: 37, orders: 25 }, { day: '22 Nov', sales: 52, orders: 36 },
  { day: '25 Nov', sales: 46, orders: 31 }, { day: '28 Nov', sales: 63, orders: 44 },
];
const categories = [
  { name: 'Fashion & Aksesori', value: 82, color: '#8b7cff' },
  { name: 'Beauty & Personal Care', value: 67, color: '#4bc6a8' },
  { name: 'Rumah Tangga', value: 54, color: '#f4b860' },
  { name: 'Elektronik', value: 38, color: '#65a7f5' },
];
const products = [
  { name: 'Tas Selempang Wanita Minimalis', category: 'Fashion', price: 'Rp89.000', growth: '+32,8%', platform: 'Shopee', score: 94, tag: 'Potensi tinggi', color: 'purple' },
  { name: 'Serum Wajah Niacinamide 10%', category: 'Beauty', price: 'Rp45.000', growth: '+24,5%', platform: 'TikTok Shop', score: 89, tag: 'Sedang naik', color: 'green' },
  { name: 'Rak Dapur Multifungsi', category: 'Rumah Tangga', price: 'Rp72.500', growth: '+18,2%', platform: 'Tokopedia', score: 85, tag: 'Stabil', color: 'blue' },
  { name: 'Botol Minum Tumbler 1L', category: 'Lifestyle', price: 'Rp39.900', growth: '+15,7%', platform: 'Shopee', score: 81, tag: 'Stabil', color: 'orange' },
];

function MetricCard({ title, value, change, icon: Icon, note }: { title: string; value: string; change: string; icon: React.ElementType; note: string }) {
  return <div className="metric-card"><div className="metric-top"><span>{title}</span><span className="metric-icon"><Icon size={18}/></span></div><div className="metric-value">{value}</div><div className="metric-bottom"><span className="positive"><ArrowUpRight size={14}/>{change}</span><span>{note}</span></div></div>;
}

export default function Dashboard() {
  const [active, setActive] = useState('Overview');
  const [period, setPeriod] = useState('30 hari terakhir');
  const [query, setQuery] = useState('');
  const [platform, setPlatform] = useState('Semua marketplace');
  const [mobileOpen, setMobileOpen] = useState(false);
  const filteredProducts = products.filter(p => `${p.name} ${p.category} ${p.platform}`.toLowerCase().includes(query.toLowerCase()) && (platform === 'Semua marketplace' || p.platform === platform));
  const nav = [
    { label: 'Overview', icon: LayoutDashboard }, { label: 'Riset Produk', icon: Search },
    { label: 'Analisis Kompetitor', icon: Target }, { label: 'Tren Pasar', icon: TrendingUp },
    { label: 'Kalkulator Profit', icon: Wallet },
  ];
  return <main className="app-shell">
    <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
      <div className="brand"><div className="brand-mark"><ChartNoAxesCombined size={21}/></div><div><strong>MarketScope<span>AI</span></strong><small>MARKETPLACE INTELLIGENCE</small></div><button className="mobile-close" onClick={() => setMobileOpen(false)}><X size={18}/></button></div>
      <div className="workspace"><div className="workspace-avatar">MS</div><div><b>My Workspace</b><small>Free research space</small></div><ChevronDown size={15}/></div>
      <div className="nav-label">WORKSPACE</div>
      <nav>{nav.map(item => <button key={item.label} className={`nav-item ${active === item.label ? 'active' : ''}`} onClick={() => { setActive(item.label); setMobileOpen(false); }}><item.icon size={18}/><span>{item.label}</span>{item.label === 'Riset Produk' && <span className="nav-new">NEW</span>}</button>)}</nav>
      <div className="nav-label second-label">PREFERENSI</div>
      <button className="nav-item" onClick={() => setActive('Pengaturan')}><Settings2 size={18}/><span>Pengaturan</span></button>
      <button className="nav-item" onClick={() => setActive('Bantuan')}><CircleHelp size={18}/><span>Pusat Bantuan</span></button>
      <div className="sidebar-bottom"><div className="upgrade-card"><div className="upgrade-icon"><Sparkles size={17}/></div><b>Unlock MarketScope Pro</b><p>Dapatkan insight lebih dalam dan analisis tanpa batas.</p><button onClick={() => alert('Paket Pro akan segera tersedia.')}>Jelajahi Pro <ExternalLink size={13}/></button></div><div className="profile"><div className="profile-avatar">U</div><div><b>Workspace User</b><small>Free Plan</small></div><ChevronDown size={15}/></div></div>
    </aside>

    <section className="main-area">
      <header className="topbar"><div className="topbar-left"><button className="menu-button" onClick={() => setMobileOpen(true)}><Menu size={20}/></button><span className="breadcrumb">Workspace</span><span className="crumb-slash">/</span><b>{active}</b></div><div className="topbar-right"><div className="search-global"><Search size={16}/><input placeholder="Cari produk, toko, atau insight..."/><kbd>⌘ K</kbd></div><button className="icon-button" aria-label="Notifikasi"><Bell size={18}/><i/></button><div className="top-avatar">U</div></div></header>

      <div className="content-wrap">
        <div className="page-heading"><div><div className="eyebrow"><span className="live-dot"/> MARKET INTELLIGENCE</div><h1>{active === 'Overview' ? 'Market Overview' : active}</h1><p>Pantau performa dan temukan peluang baru di berbagai marketplace.</p></div><div className="heading-actions"><button className="button-secondary" onClick={() => alert('Ekspor laporan akan tersedia setelah sumber data terhubung.')}><Download size={16}/> Export</button><button className="button-primary" onClick={() => setActive('Riset Produk')}><Sparkles size={16}/> Mulai Riset</button></div></div>

        <div className="demo-notice"><div className="notice-icon"><Lightbulb size={17}/></div><div><b>Mode Demo</b><span>Angka dan grafik di bawah adalah data simulasi untuk preview dashboard, bukan data penjualan aktual marketplace.</span></div><span className="demo-pill">SAMPLE DATA</span></div>

        <div className="filter-row"><div className="platform-tabs"><button className={platform === 'Semua marketplace' ? 'selected' : ''} onClick={() => setPlatform('Semua marketplace')}>Semua</button><button className={platform === 'Shopee' ? 'selected' : ''} onClick={() => setPlatform('Shopee')}><span className="platform-dot shopee"/>Shopee</button><button className={platform === 'TikTok Shop' ? 'selected' : ''} onClick={() => setPlatform('TikTok Shop')}><span className="platform-dot tiktok"/>TikTok Shop</button><button className={platform === 'Tokopedia' ? 'selected' : ''} onClick={() => setPlatform('Tokopedia')}><span className="platform-dot tokopedia"/>Tokopedia</button></div><div className="period-select"><Filter size={15}/><select value={period} onChange={e => setPeriod(e.target.value)}><option>7 hari terakhir</option><option>30 hari terakhir</option><option>90 hari terakhir</option></select><ChevronDown size={14}/></div></div>

        <div className="metrics-grid"><MetricCard title="Produk Terpantau" value="2.845" change="12,8%" note="vs periode lalu" icon={Boxes}/><MetricCard title="Rata-rata Harga" value="Rp 128,5K" change="4,2%" note="vs periode lalu" icon={Wallet}/><MetricCard title="Tren Pencarian" value="68,4K" change="18,6%" note="vs periode lalu" icon={Activity}/><MetricCard title="Peluang Produk" value="126" change="8,3%" note="produk potensial" icon={Flame}/></div>

        <div className="analytics-grid"><section className="panel sales-panel"><div className="panel-heading"><div><h2>Market Activity</h2><p>Indeks aktivitas produk berdasarkan periode</p></div><button className="more-button">•••</button></div><div className="chart-legend"><span><i className="legend-purple"/> Aktivitas pasar</span><span><i className="legend-mint"/> Pesanan (indeks)</span></div><div className="chart-area"><ResponsiveContainer width="100%" height="100%"><AreaChart data={salesData} margin={{top: 10, right: 8, left: -18, bottom: 0}}><defs><linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8878f8" stopOpacity={0.23}/><stop offset="100%" stopColor="#8878f8" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 5" vertical={false} stroke="#25283a"/><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill:'#777d94',fontSize:11}} dy={10}/><YAxis axisLine={false} tickLine={false} tick={{fill:'#777d94',fontSize:11}}/><Tooltip contentStyle={{background:'#171a29',border:'1px solid #30344a',borderRadius:12,color:'#fff'}}/><Area type="monotone" dataKey="sales" name="Aktivitas pasar" stroke="#9182ff" strokeWidth={2.5} fill="url(#salesGradient)"/><Area type="monotone" dataKey="orders" name="Pesanan (indeks)" stroke="#55cbb0" strokeWidth={2} fill="transparent"/></AreaChart></ResponsiveContainer></div><div className="chart-footnote"><span className="footnote-dot"/> Aktivitas pasar menunjukkan indeks simulasi, bukan volume transaksi resmi.</div></section>

        <section className="panel category-panel"><div className="panel-heading"><div><h2>Kategori Populer</h2><p>Indeks minat berdasarkan kategori</p></div><button className="more-button">•••</button></div><div className="category-list">{categories.map(c => <div className="category-item" key={c.name}><div className="category-meta"><span>{c.name}</span><b>{c.value}</b></div><div className="progress-track"><div className="progress-fill" style={{width:`${c.value}%`,background:c.color}}/></div></div>)}</div><div className="category-insight"><div className="insight-icon"><TrendingUp size={17}/></div><div><b>Fashion memimpin tren</b><p>Kategori dengan indeks minat tertinggi pada data demo.</p></div></div></section></div>

        <section className="panel products-panel"><div className="panel-heading product-heading"><div><h2>Produk dengan Potensi Tinggi</h2><p>Daftar contoh produk untuk eksplorasi riset</p></div><button className="text-link" onClick={() => setActive('Riset Produk')}>Lihat semua <ArrowUpRight size={15}/></button></div><div className="table-toolbar"><div className="table-search"><Search size={15}/><input placeholder="Cari nama produk..." value={query} onChange={e => setQuery(e.target.value)}/></div><span className="result-count">{filteredProducts.length} produk ditemukan</span></div><div className="table-scroll"><table><thead><tr><th>NAMA PRODUK</th><th>MARKETPLACE</th><th>HARGA RATA-RATA</th><th>PERTUMBUHAN</th><th>POTENSI</th><th/></tr></thead><tbody>{filteredProducts.map((p,i)=><tr key={p.name}><td><div className="product-name"><div className={`product-thumb thumb-${p.color}`}><ShoppingBag size={17}/></div><div><b>{p.name}</b><small>{p.category} · Sample #{String(i+1).padStart(3,'0')}</small></div></div></td><td><span className="marketplace-name">{p.platform}</span></td><td className="price-cell">{p.price}</td><td><span className="growth"><ArrowUpRight size={14}/>{p.growth}</span></td><td><span className={`potential ${p.color}`}>{p.tag}</span></td><td><button className="row-action" aria-label="Lihat produk"><ExternalLink size={15}/></button></td></tr>)}</tbody></table>{filteredProducts.length===0 && <div className="empty-state">Produk tidak ditemukan. Coba kata kunci lain.</div>}</div></section>

        <footer><span>© 2026 MarketScope AI</span><span><i className="footer-status"/> All systems operational <span className="footer-sep">·</span> Built for smarter commerce</span></footer>
      </div>
    </section>
  </main>;
}
