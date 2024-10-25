import React, { useState } from 'react';
import {login, signUp} from "../api/authService";

function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true); // Estado para alternar entre login y registro
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      // Lógica inicio de sesión
      console.log('Logging in with', { user, password });
      // Aquí podrías llamar a tu API de login con fetch/axios
      await login(user, password);
      console.log('Logging in', { user, password });
    } else {
      // Lógica registro
      console.log('Signin up with', { user, password });
      // Aquí podrías llamar a tu API de registro con fetch/axios
      console.log('Signing up', { user, password });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        {isLogin ? (
          <div>
            <h2>Log in</h2>
            <form onSubmit={handleSubmit}>
              <label>User:</label>
              <input
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
              />
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Log in</button>
            </form>
            <p>Don't have an account? <span className="toggle" onClick={toggleForm}>Sign up here</span></p>
          </div>
        ) : (
          <div>
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit}>
              <label>User:</label>
              <input
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
              />
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Sign up</button>
            </form>
            <p>Already have an account? <span className="toggle" onClick={toggleForm}>Log in here</span></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthModal;
