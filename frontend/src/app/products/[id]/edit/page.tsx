'use client';
import { use } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import ProductForm from '@/components/ProductForm';

const GET_PRODUCT = gql`
  query GetProduct($id: Int!) {
    product(id: $id) {
      id name description price quantity category sku
    }
  }
`;

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data, loading } = useQuery(GET_PRODUCT, { variables: { id: parseInt(id) } });

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: 'var(--text-secondary)' }}>
      Loading...
    </div>
  );

  const p = data?.product;
  if (!p) return <div style={{ padding: '40px', color: 'var(--danger)' }}>Product not found</div>;

  return (
    <ProductForm
      productId={p.id}
      initialData={{
        name: p.name,
        description: p.description || '',
        price: String(p.price),
        quantity: String(p.quantity),
        category: p.category,
        sku: p.sku,
      }}
    />
  );
}
