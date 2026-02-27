'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@apollo/client';
import AppLayout from '@/components/AppLayout';
import { useAuth } from '@/context/AuthContext';
import { GET_PRODUCTS, DELETE_PRODUCT } from '@/graphql/queries';

export default function ProductsPage() {
  const { isManager } = useAuth();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data, loading, refetch } = useQuery(GET_PRODUCTS);
  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    onCompleted: () => { setDeleteId(null); refetch(); },
  });

  const products = (data?.products || []).filter((p: any) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="animate-fade-in">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '32px',
              fontWeight: '800',
              letterSpacing: '-1px',
              marginBottom: '8px',
            }}>Products</h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              {products.length} item{products.length !== 1 ? 's' : ''} in inventory
            </p>
          </div>
          <button
            className="btn-primary"
            onClick={() => router.push('/products/new')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <span>+</span> Add Product
          </button>
        </div>

        {/* Search */}
        <div style={{ marginBottom: '20px' }}>
          <input
            className="input-field"
            placeholder="Search by name, category, or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: '400px' }}
          />
        </div>

        {/* Table */}
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}>
                {['Product', 'SKU', 'Category', 'Price', 'Qty', 'Actions'].map((h) => (
                  <th key={h} style={{
                    padding: '14px 16px',
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
              {loading ? (
                <tr><td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>No products found</td></tr>
              ) : products.map((product: any, i: number) => (
                <tr
                  key={product.id}
                  className="animate-fade-in"
                  style={{
                    borderBottom: '1px solid var(--border)',
                    animationDelay: `${i * 0.04}s`,
                    opacity: 0,
                  }}
                >
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: '500', marginBottom: '2px' }}>{product.name}</div>
                    {product.description && (
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                        {product.description.substring(0, 40)}...
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                    {product.sku}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      background: 'rgba(124,106,247,0.1)',
                      color: 'var(--accent)',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                    }}>{product.category}</span>
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: '600', fontSize: '15px' }}>
                    ${product.price.toFixed(2)}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      color: product.quantity < 20 ? 'var(--warning)' : product.quantity < 5 ? 'var(--danger)' : 'var(--success)',
                      fontWeight: '600',
                    }}>{product.quantity}</span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => router.push(`/products/${product.id}/edit`)}
                        style={{
                          padding: '6px 12px',
                          background: 'rgba(124,106,247,0.1)',
                          border: '1px solid rgba(124,106,247,0.2)',
                          borderRadius: '8px',
                          color: 'var(--accent)',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontFamily: 'var(--font-display)',
                          fontWeight: '600',
                        }}
                      >Edit</button>
                      {isManager && (
                        <button
                          onClick={() => setDeleteId(product.id)}
                          style={{
                            padding: '6px 12px',
                            background: 'rgba(240,93,93,0.1)',
                            border: '1px solid rgba(240,93,93,0.2)',
                            borderRadius: '8px',
                            color: 'var(--danger)',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontFamily: 'var(--font-display)',
                            fontWeight: '600',
                          }}
                        >Delete</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {deleteId && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
        }}>
          <div className="card animate-fade-in" style={{ padding: '32px', maxWidth: '360px', width: '100%' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px', textAlign: 'center' }}>⚠️</div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '20px',
              fontWeight: '700',
              marginBottom: '8px',
              textAlign: 'center',
            }}>Delete Product?</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', textAlign: 'center', marginBottom: '24px' }}>
              This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setDeleteId(null)}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-display)',
                  fontWeight: '600',
                }}
              >Cancel</button>
              <button
                onClick={() => deleteProduct({ variables: { id: deleteId } })}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'var(--danger)',
                  border: 'none',
                  borderRadius: '10px',
                  color: 'white',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-display)',
                  fontWeight: '600',
                }}
              >Delete</button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
