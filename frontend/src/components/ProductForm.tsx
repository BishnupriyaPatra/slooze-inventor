'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@apollo/client';
import AppLayout from '@/components/AppLayout';
import { CREATE_PRODUCT, UPDATE_PRODUCT, GET_PRODUCTS } from '@/graphql/queries';

interface ProductFormProps {
  productId?: number;
  initialData?: {
    name: string;
    description: string;
    price: string;
    quantity: string;
    category: string;
    sku: string;
  };
}

const emptyForm = { name: '', description: '', price: '', quantity: '', category: '', sku: '' };

export default function ProductForm({ productId, initialData }: ProductFormProps) {
  const router = useRouter();
  const [form, setForm] = useState(initialData || emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState('');

  const [createProduct, { loading: creating }] = useMutation(CREATE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
    onCompleted: () => {
      setSuccess('Product created successfully!');
      setTimeout(() => router.push('/products'), 1500);
    },
    onError: (e) => setErrors({ form: e.message }),
  });

  const [updateProduct, { loading: updating }] = useMutation(UPDATE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
    onCompleted: () => {
      setSuccess('Product updated successfully!');
      setTimeout(() => router.push('/products'), 1500);
    },
    onError: (e) => setErrors({ form: e.message }),
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.price || isNaN(+form.price)) newErrors.price = 'Valid price required';
    if (!form.quantity || isNaN(+form.quantity)) newErrors.quantity = 'Valid quantity required';
    if (!form.category.trim()) newErrors.category = 'Category is required';
    if (!productId && !form.sku.trim()) newErrors.sku = 'SKU is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const input = {
      name: form.name,
      description: form.description || undefined,
      price: parseFloat(form.price),
      quantity: parseInt(form.quantity),
      category: form.category,
      ...(productId ? {} : { sku: form.sku }),
    };
    if (productId) {
      updateProduct({ variables: { id: productId, input } });
    } else {
      createProduct({ variables: { input } });
    }
  };

  const fields = [
    { key: 'name', label: 'Product Name', placeholder: 'e.g. Wireless Mouse', type: 'text', required: true },
    { key: 'sku', label: 'SKU', placeholder: 'e.g. ELEC-007', type: 'text', required: !productId, disabled: !!productId },
    { key: 'category', label: 'Category', placeholder: 'e.g. Electronics', type: 'text', required: true },
    { key: 'price', label: 'Price ($)', placeholder: '0.00', type: 'number', required: true },
    { key: 'quantity', label: 'Quantity', placeholder: '0', type: 'number', required: true },
    { key: 'description', label: 'Description', placeholder: 'Optional product description', type: 'textarea', required: false },
  ];

  return (
    <AppLayout>
      <div className="animate-fade-in" style={{ maxWidth: '560px' }}>
        <div style={{ marginBottom: '32px' }}>
          <button
            onClick={() => router.push('/products')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '14px',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-body)',
            }}
          >← Back to Products</button>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '32px',
            fontWeight: '800',
            letterSpacing: '-1px',
          }}>{productId ? 'Edit Product' : 'Add Product'}</h1>
        </div>

        <div className="card" style={{ padding: '32px' }}>
          {success && (
            <div style={{
              padding: '14px 16px',
              background: 'rgba(74,222,128,0.1)',
              border: '1px solid rgba(74,222,128,0.3)',
              borderRadius: '10px',
              color: 'var(--success)',
              fontSize: '14px',
              marginBottom: '20px',
            }}>✓ {success}</div>
          )}
          {errors.form && (
            <div style={{
              padding: '14px 16px',
              background: 'rgba(240,93,93,0.1)',
              border: '1px solid rgba(240,93,93,0.3)',
              borderRadius: '10px',
              color: 'var(--danger)',
              fontSize: '14px',
              marginBottom: '20px',
            }}>{errors.form}</div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {fields.map((field) => {
              if (field.disabled) return null;
              return (
                <div key={field.key}>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: 'var(--text-secondary)',
                    marginBottom: '6px',
                    fontFamily: 'var(--font-display)',
                  }}>
                    {field.label} {field.required && <span style={{ color: 'var(--danger)' }}>*</span>}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      className="input-field"
                      placeholder={field.placeholder}
                      value={(form as any)[field.key]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      rows={3}
                      style={{ resize: 'vertical' }}
                    />
                  ) : (
                    <input
                      type={field.type}
                      className="input-field"
                      placeholder={field.placeholder}
                      value={(form as any)[field.key]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    />
                  )}
                  {errors[field.key] && (
                    <p style={{ color: 'var(--danger)', fontSize: '12px', marginTop: '4px' }}>
                      {errors[field.key]}
                    </p>
                  )}
                </div>
              );
            })}

            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <button
                type="button"
                onClick={() => router.push('/products')}
                style={{
                  flex: 1,
                  padding: '14px',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-display)',
                  fontWeight: '600',
                  fontSize: '15px',
                }}
              >Cancel</button>
              <button
                type="submit"
                className="btn-primary"
                disabled={creating || updating}
                style={{ flex: 2, padding: '14px', fontSize: '15px' }}
              >
                {creating || updating ? 'Saving...' : productId ? 'Update Product' : 'Create Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
