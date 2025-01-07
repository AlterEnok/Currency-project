import React, { useState } from 'react';
import axios from 'axios';

const AuthModal = ({ onClose, onAuthSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Лоадер

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegister ? '/register' : '/login';

    setIsLoading(true); // Включаем лоадер
    try {
      const response = await axios.post(`http://localhost:3001${url}`, formData);
      setMessage(response.data.message);
      if (response.status === 200) {
        onAuthSuccess();
        onClose();
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage(error.message);
      }
    } finally {
      setIsLoading(false); // Отключаем лоадер
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'relative',
          background: '#fff',
          padding: '20px',
          borderRadius: '8px',
          width: '400px',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            color: '#ff0054',
          }}
        >
          ✖
        </button>

        <h2>{isRegister ? 'Реєстрація' : 'Авторизація'}</h2>

        {isLoading ? (
          <div style={{ margin: '20px 0' }}>
            <div
              style={{
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #ff0054',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                margin: 'auto',
                animation: 'spin 1s linear infinite',
              }}
            ></div>
            <p>Завантаження...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ width: '100%', boxSizing: 'border-box' }}>
            {isRegister && (
              <div style={{ marginBottom: '10px' }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Ім'я"
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    width: 'calc(100% - 20px)',
                    padding: '10px',
                    marginBottom: '10px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            )}
            <div style={{ marginBottom: '10px' }}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: 'calc(100% - 20px)',
                  padding: '10px',
                  marginBottom: '10px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="password"
                name="password"
                placeholder="Пароль"
                value={formData.password}
                onChange={handleChange}
                style={{
                  width: 'calc(100% - 20px)',
                  padding: '10px',
                  marginBottom: '10px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                background: '#ff0054',
                color: '#fff',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              {isRegister ? 'Зареєструватися' : 'Увійти'}
            </button>
          </form>
        )}

        {message && <p style={{ marginTop: '10px', color: 'red' }}>{message}</p>}
        <p style={{ marginTop: '10px' }}>
          {isRegister ? 'Вже маєте акаунт?' : 'Немає акаунта?'}{' '}
          <span
            onClick={toggleForm}
            style={{ color: '#ff0054', cursor: 'pointer', textDecoration: 'underline' }}
          >
            {isRegister ? 'Увійти' : 'Зареєструватися'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
