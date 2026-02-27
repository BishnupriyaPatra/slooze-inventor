'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { useAuth } from '@/context/AuthContext';
import AppLayout from '@/components/AppLayout';
import { GET_PRODUCT_STATS, GET_PRODUCTS } from '@/graphql/queries';

export default function DashboardPage() {
  const { user, isManager } = useAuth();
  const router = useRouter();

  const { data: statsData, loading: statsLoading } = useQuery(GET_PRODUCT_STATS, {
    skip: !isManager,
  });
  const { data: productsData } = useQuery(GET_PRODUCTS);

  useEffect(() => {
    if (user && !isManager) {
      router.push('/products');
    }
  }, [user, isManager, router]);

  if (!isManager) return null;

  const stats = statsData?.productStats;
  const products = productsData?.products || [];
  const recentProducts = products.slice(0, 5);

  const statCards = [
    { label: 'Total Products', value: stats?.totalProducts ?? '—', icon: '📦', color: 'var(--accent)' },
    { label: 'Total Value', value: stats ? `$${stats.totalValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}` : '—', icon: '💰', color: '#4ade80' },
    { label: 'Low Stock', value: stats?.lowStock ?? '—', icon: '⚠️', color: '#fbbf24' },
    { label: 'Categories', value: stats?.categories ?? '—', icon: '🗂️', color: '#60a5fa' },
  ];

  return (
    <AppLayout>
      <div className="animate-fade-in">
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '32px',
            fontWeight: '800',
            letterSpacing: '-1px',
            marginBottom: '8px',
          }}>Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Overview of your inventory operations</p>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '32px',
        }}>
          {statCards.map((stat, i) => (
            <div
              key={stat.label}
              className="card animate-fade-in"
              style={{
                padding: '24px',
                animationDelay: `${i * 0.08}s`,
                opacity: 0,
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
              }}>
                <span style={{ fontSize: '24px' }}>{stat.icon}</span>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: stat.color,
                  boxShadow: `0 0 8px ${stat.color}`,
                }} />
              </div>
              <div style={{
                fontSize: '32px',
                fontFamily: 'var(--font-display)',
                fontWeight: '800',
                color: stat.color,
                letterSpacing: '-1px',
                marginBottom: '4px',
              }}>
                {statsLoading ? '...' : stat.value}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Recent Products */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: '700' }}>
              Recent Products
            </h2>
            <button
              onClick={() => router.push('/products')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent)',
                cursor: 'pointer',
                fontSize: '13px',
                fontFamily: 'var(--font-display)',
                fontWeight: '600',
              }}
            >View all →</button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Product', 'SKU', 'Category', 'Price', 'Stock'].map((h) => (
                  <th key={h} style={{
                    padding: '10px 12px',
                    textAlign: 'left',
                    fontSize: '11px',
                    fontFamily: 'var(--font-display)',
                    fontWeight: '700',
                    color: 'var(--text-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentProducts.map((product: any) => (
                <tr key={product.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px', fontSize: '14px', fontWeight: '500' }}>{product.name}</td>
                  <td style={{ padding: '12px', fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{product.sku}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      background: 'rgba(124,106,247,0.1)',
                      color: 'var(--accent)',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                    }}>{product.category}</span>
                  </td>
                  <td style={{ padding: '12px', fontSize: '14px', fontWeight: '600' }}>${product.price}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      color: product.quantity < 20 ? 'var(--warning)' : 'var(--success)',
                      fontSize: '14px',
                      fontWeight: '600',
                    }}>{product.quantity}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
