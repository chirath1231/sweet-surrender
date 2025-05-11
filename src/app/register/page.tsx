'use client';
import { use, useState } from 'react';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const res = await fetch('http://127.0.0.1:8000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
        password_confirmation: form.confirm,
      }),
    });

    if (res.ok) {
      setMessage('Registration successful! You can now login.');
      setForm({ name: '', email: '', password: '', confirm: '' });
    } else {
      const data = await res.json();
      setMessage(data.message || 'Registration failed');
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} type="email" required />
        <input placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} type="password" required />
        <input placeholder="Confirm Password" value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} type="password" required />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
