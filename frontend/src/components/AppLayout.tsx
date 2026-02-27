'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊', managerOnly: true },
  { href: '/products', label: 'Products', icon: '📦', managerOnly: false },
  { href: '/products/new', label: 'Add Product', icon: '➕', managerOnly: false },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, isManager } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  const visibleNav = navItems.filter((item) => !item.managerOnly || isManager);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Sidebar */}
      <aside style={{
        width: '240px',
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 16px',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        zIndex: 10,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px', padding: '0 8px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            background: 'var(--accent)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
          }}>📦</div>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: '800',
            fontSize: '20px',
            letterSpacing: '-0.5px',
          }}>Slooze</span>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {visibleNav.map((item) => {
            const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '11px 14px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: active ? '600' : '400',
                  fontFamily: active ? 'var(--font-display)' : 'var(--font-body)',
                  color: active ? 'var(--accent)' : 'var(--text-secondary)',
                  background: active ? 'rgba(124,106,247,0.1)' : 'transparent',
                  border: `1px solid ${active ? 'rgba(124,106,247,0.2)' : 'transparent'}`,
                  transition: 'all 0.15s',
                }}
              >
                <span style={{ fontSize: '16px' }}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              width: '100%',
              padding: '10px 14px',
              borderRadius: '10px',
              border: 'none',
              background: 'transparent',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '14px',
              marginBottom: '8px',
              fontFamily: 'var(--font-body)',
            }}
          >
            <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>

          {/* User info */}
          <div style={{
            padding: '12px 14px',
            borderRadius: '10px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            marginBottom: '8px',
          }}>
            <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>{user.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{user.email}</span>
              <span className={`badge badge-${isManager ? 'manager' : 'keeper'}`}>
                {isManager ? 'Manager' : 'Keeper'}
              </span>
            </div>
          </div>

          <button
            onClick={() => { logout(); router.push('/login'); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              width: '100%',
              padding: '10px 14px',
              borderRadius: '10px',
              border: 'none',
              background: 'transparent',
              color: 'var(--danger)',
              cursor: 'pointer',
              fontSize: '14px',
              fontFamily: 'var(--font-body)',
            }}
          >
            🚪 Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ marginLeft: '240px', flex: 1, padding: '32px', minHeight: '100vh' }}>
        {children}
      </main>
    </div>
  );
}
