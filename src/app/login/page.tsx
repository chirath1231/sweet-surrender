'use client';
import { use, useState } from 'react';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const res = await fetch('http://127.0.0.1:8000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const token = await res.text(); // Laravel returns plain token
      localStorage.setItem('auth_token', token);
      setMessage('Login successful!');
    } else {
      setMessage('Login failed. Check email or password.');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} type="email" required />
        <input placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} type="password" required />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
