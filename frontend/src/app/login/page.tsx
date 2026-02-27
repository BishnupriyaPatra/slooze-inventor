'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { useAuth } from '@/context/AuthContext';
import { LOGIN_MUTATION } from '@/graphql/queries';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      login(data.login.token, data.login.user);
      router.push('/dashboard');
    },
    onError: (err) => setError(err.message),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    loginMutation({ variables: { email, password } });
  };

  const fillDemo = (role: 'manager' | 'keeper') => {
    setEmail(role === 'manager' ? 'manager@slooze.com' : 'keeper@slooze.com');
    setPassword('password123');
    setError('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '-200px',
        right: '-200px',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,106,247,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-150px',
        left: '-150px',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="animate-fade-in" style={{ width: '100%', maxWidth: '420px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '12px',
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              background: 'var(--accent)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
            }}>📦</div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '28px',
              fontWeight: '800',
              color: 'var(--text-primary)',
              letterSpacing: '-0.5px',
            }}>Slooze</h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Inventory Management System
          </p>
        </div>

        {/* Card */}
        <div className="card" style={{ padding: '36px' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '22px',
            fontWeight: '700',
            marginBottom: '8px',
            color: 'var(--text-primary)',
          }}>Welcome back</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '28px' }}>
            Sign in to your account to continue
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '500',
                color: 'var(--text-secondary)',
                marginBottom: '6px',
                fontFamily: 'var(--font-display)',
              }}>Email</label>
              <input
                type="email"
                className="input-field"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '500',
                color: 'var(--text-secondary)',
                marginBottom: '6px',
                fontFamily: 'var(--font-display)',
              }}>Password</label>
              <input
                type="password"
                className="input-field"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div style={{
                padding: '12px 16px',
                background: 'rgba(240, 93, 93, 0.1)',
                border: '1px solid rgba(240, 93, 93, 0.3)',
                borderRadius: '10px',
                color: 'var(--danger)',
                fontSize: '13px',
              }}>{error}</div>
            )}

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{ marginTop: '4px', padding: '14px', fontSize: '15px' }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo accounts */}
          <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px', textAlign: 'center' }}>
              Quick Demo Access
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => fillDemo('manager')}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: 'rgba(124,106,247,0.1)',
                  border: '1px solid rgba(124,106,247,0.3)',
                  borderRadius: '10px',
                  color: 'var(--accent)',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontFamily: 'var(--font-display)',
                  fontWeight: '600',
                }}
              >Manager</button>
              <button
                onClick={() => fillDemo('keeper')}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: 'rgba(74,222,128,0.08)',
                  border: '1px solid rgba(74,222,128,0.2)',
                  borderRadius: '10px',
                  color: 'var(--success)',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontFamily: 'var(--font-display)',
                  fontWeight: '600',
                }}
              >Store Keeper</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
