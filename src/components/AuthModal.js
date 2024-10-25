import React, { useState } from 'react';
import { login, signUp } from "../api/authService";
import '../styles/styleModal.css'

function AuthModal({ isOpen, onClose, type, onAuthSuccess }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === 'login') {
      console.log('Logging in with', { user, password });

      const result = await login(user, password);

      if (!result.error) {
        onAuthSuccess();
        onClose();
      } else {
        alert(result.error);
      }
    } else {
      console.log('Signing up with', { user, password });

      const success = await signUp(user, password);

      if (success) {
        onAuthSuccess();
        onClose();
      }
    }
  };



  if (!isOpen) return null;

  return (
      <div className="modal">
        <div className="modal-content">
          <span className="close-btn" onClick={onClose}>&times;</span>
          {type === 'login' ? (
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
              </div>
          )}
        </div>
      </div>
  );
}

export default AuthModal;

