'use client'; // 👈 Must be the first line

import { useState } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';


const ContactPage = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [success, setSuccess] = useState('');

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/contact', form);
            setSuccess('Message sent successfully!');
            setForm({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Error sending message:', error);
            setSuccess('Failed to send message.');
        }
    };

    return (
        <>
            <Header />
            <main>
                <section className="contact-form">
                    <h2>Send us a Message</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Your Name</label>
                            <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Your Email</label>
                            <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea id="message" name="message" value={form.message} onChange={handleChange} rows={5} required />
                        </div>
                        <button type="submit" className="button">Send Message</button>
                        {success && <p>{success}</p>}
                    </form>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default ContactPage;
