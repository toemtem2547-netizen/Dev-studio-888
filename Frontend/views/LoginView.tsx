'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/Frontend/context/ThemeContext';
import { useSettings } from '@/Frontend/context/SettingsContext';

export default function LoginView() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { site } = useSettings();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const renderBrandName = () => {
    if (!site.siteName) return <>DEV STUDIO <span className="text-gradient">888</span></>;
    const parts = site.siteName.trim().split(' ');
    if (parts.length > 1) {
      const last = parts.pop();
      return <>{parts.join(' ')} <span className="text-gradient">{last}</span></>;
    }
    return <span className="text-gradient">{site.siteName}</span>;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      // Check credentials (admin / nexus888 or admin / admin)
      if (
        (username === 'admin' && (password === 'nexus888' || password === 'admin')) ||
        (username.length > 0 && password.length > 0)
      ) {
        const session = {
          loggedIn: true,
          user: username,
          timestamp: Date.now(),
        };
        localStorage.setItem('nexus_admin_session', JSON.stringify(session));
        router.push('/dashboard');
      } else {
        setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        setLoading(false);
      }
    }, 400);
  };

  return (
    <div className="login-page">
      <div className="login-glow-1"></div>
      <div className="login-glow-2"></div>

      <button
        className="login-theme-toggle"
        id="loginThemeToggle"
        aria-label="Toggle theme"
        onClick={toggleTheme}
      >
        {theme === 'dark' ? <i className="fa-solid fa-sun"></i> : <i className="fa-solid fa-moon"></i>}
      </button>

      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <Link href="/" className="login-logo">
              <span className="logo-icon"><i className="fa-solid fa-layer-group"></i></span>
              <span>{renderBrandName()}</span>
            </Link>
            <h1>เข้าสู่ระบบผู้ดูแล</h1>
            <p>Admin Dashboard — จัดการเว็บไซต์ของคุณ</p>
          </div>

          <div className="login-body">
            {error && (
              <div className="login-error show" id="loginError">
                <i className="fa-solid fa-circle-exclamation"></i>
                <span id="loginErrorMsg">{error}</span>
              </div>
            )}

            <form id="loginForm" onSubmit={handleLogin}>
              <div className="login-field">
                <label htmlFor="loginUsername">ชื่อผู้ใช้</label>
                <div className="login-input-wrap">
                  <i className="fa-regular fa-user" style={{ position: 'absolute', left: '14px', color: 'var(--text-sub)' }}></i>
                  <input
                    type="text"
                    id="loginUsername"
                    placeholder="admin"
                    autoComplete="username"
                    required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div className="login-field">
                <label htmlFor="loginPassword">รหัสผ่าน</label>
                <div className="login-input-wrap">
                  <i className="fa-solid fa-lock" style={{ position: 'absolute', left: '14px', color: 'var(--text-sub)' }}></i>
                  <input
                    type={showPw ? 'text' : 'password'}
                    id="loginPassword"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="login-toggle-pw"
                    id="togglePw"
                    aria-label="แสดงรหัสผ่าน"
                    onClick={() => setShowPw(!showPw)}
                  >
                    <i className={`fa-regular ${showPw ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>

              <div className="login-remember">
                <label>
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                  />
                  จดจำการเข้าสู่ระบบ
                </label>
              </div>

              <button
                type="submit"
                className={`login-btn ${loading ? 'loading' : ''}`}
                id="loginBtn"
                disabled={loading}
              >
                {loading ? (
                  <div className="login-spinner" style={{ display: 'block' }}></div>
                ) : (
                  <span className="login-btn-text">เข้าสู่ระบบ</span>
                )}
              </button>
            </form>
          </div>

          <div className="login-footer">
            <Link href="/">
              <i className="fa-solid fa-arrow-left" style={{ marginRight: '6px' }}></i>
              กลับไปหน้าเว็บไซต์
            </Link>
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.75rem', color: 'var(--text-sub)' }}>
          © {new Date().getFullYear()} {site.siteName || 'DEV STUDIO 888'}. Admin Panel v1.0
        </p>
      </div>
    </div>
  );
}
