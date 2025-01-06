import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from '../modal/AuthModal';

const NavigationBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const openAuthModal = () => {
    setAuthModalOpen(true);
    setMenuOpen(false);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  return (
    <>
      <div style={{ background: '#ff0054', padding: '10px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>Курси валют</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <nav style={{ display: 'flex', gap: '15px' }}>
            <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Головна</Link>
            <Link to="/converter" style={{ color: '#fff', textDecoration: 'none' }}>Конвертер</Link>
            <Link to="/charts" style={{ color: '#fff', textDecoration: 'none' }}>Графіки</Link>
          </nav>
          <div style={{ position: 'relative' }}>
            <div
              onClick={toggleMenu}
              style={{
                cursor: 'pointer',
                padding: '10px',
                borderRadius: '50%',
                background: '#fff',
                color: '#ff0054',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '40px',
                height: '40px',
              }}
            >
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>👤</span>
            </div>
            {menuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '50px',
                  right: '0',
                  background: '#fff',
                  color: '#000',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  width: '150px',
                }}
              >
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  <li style={{ padding: '10px', borderBottom: '1px solid #f1f1f1', cursor: 'pointer' }}>Налаштування</li>
                  <li style={{ padding: '10px', borderBottom: '1px solid #f1f1f1', cursor: 'pointer' }}>Списки валют</li>
                  <li style={{ padding: '10px', cursor: 'pointer' }} onClick={openAuthModal}>Увійти/Зареєструватися</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      {authModalOpen && <AuthModal onClose={closeAuthModal} />}
    </>
  );
};

export default NavigationBar;
