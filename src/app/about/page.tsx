'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AboutPage = () => {
    const [showFullStory, setShowFullStory] = useState(false);

    const toggleStory = () => setShowFullStory(!showFullStory);

    return (
        <>
            <Header />
            <main className="about-us" style={{ padding: '2rem' }}>
                <section style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h2>About Sweet Surrender Bakery</h2>
                    <p>
                        Welcome to Sweet Surrender Bakery, where passion for baking and the finest ingredients
                        come together to create unforgettable treats.
                    </p>
                    <button
                        onClick={toggleStory}
                        style={{
                            marginTop: '10px',
                            padding: '8px 16px',
                            backgroundColor: '#d47a4c',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        {showFullStory ? 'Hide Story' : 'Read Our Story'}
                    </button>
                    {showFullStory && (
                        <div style={{ marginTop: '1rem', color: '#444' }}>
                            <p style={{ marginBottom: '1rem' }}>
                                Our story began in a cozy home kitchen where Emily discovered her passion for pastries.
                                What started as weekend experiments with family recipes quickly blossomed into a
                                lifelong dedication to the art of baking.
                            </p>
                            <p style={{ marginBottom: '1rem' }}>
                                In 2010, we opened our first tiny shop with just three display cases and a small oven.
                                Word spread quickly about our handcrafted pastries, and soon we had lines forming
                                around the block every morning. Over the years, we grew into a beloved neighborhood
                                bakery, expanding to two locations while maintaining our commitment to quality.
                            </p>
                            <p>
                                Today, every cake, cookie, and croissant is still made with the same care and
                                attention to detail as those first home-kitchen creations. We source our ingredients
                                from local suppliers whenever possible, and each recipe has been perfected through
                                years of dedication. Our mission remains simple: bringing smiles, one delicious
                                bite at a time.
                            </p>
                        </div>
                    )}
                </section>

                <section className="team-members" style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
                    {[
                        {
                            name: 'Emily',
                            role: 'Head Baker & Founder',
                            image: 'emily.jpg',
                            bio: 'Emily has 15+ years of experience and loves crafting artisan cakes.',
                        },
                        {
                            name: 'David',
                            role: 'Pastry Chef',
                            image: 'david.jpg',
                            bio: 'David’s specialties include seasonal tarts and croissants.',
                        },
                    ].map((member) => (
                        <div
                            key={member.name}
                            className="team-member"
                            style={{
                                textAlign: 'center',
                                maxWidth: '220px',
                                padding: '20px',
                                border: '1px solid #eee',
                                borderRadius: '10px',
                                transition: 'transform 0.3s ease',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                style={{ width: '120px', borderRadius: '50%' }}
                            />
                            <h3>{member.name}</h3>
                            <p>{member.role}</p>
                            <p style={{ fontSize: '0.85rem', color: '#555' }}>{member.bio}</p>
                        </div>
                    ))}
                </section>

                <section className="sweet-stats" style={{ marginTop: '60px', textAlign: 'center' }}>
                    <h3>Sweet Stats</h3>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '20px', flexWrap: 'wrap' }}>
                        <div>
                            <h4 style={{ fontSize: '2rem', color: '#d47a4c' }}>100+</h4>
                            <p>Cakes Sold</p>
                        </div>
                        <div>
                            <h4 style={{ fontSize: '2rem', color: '#d47a4c' }}>13</h4>
                            <p>Years in Business</p>
                        </div>
                        <div>
                            <h4 style={{ fontSize: '2rem', color: '#d47a4c' }}>2</h4>
                            <p>Locations</p>
                        </div>
                    </div>
                </section>

                <section className="faq" style={{ marginTop: '60px', maxWidth: '600px', margin: '60px auto' }}>
                    <h3 style={{ textAlign: 'center' }}>Frequently Asked Questions</h3>
                    <details style={{ margin: '10px 0' }}>
                        <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Do you offer custom cakes?</summary>
                        <p style={{ paddingLeft: '1rem', color: '#555' }}>Yes! Custom orders can be placed 3 days in advance.</p>
                    </details>
                    <details style={{ margin: '10px 0' }}>
                        <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Do you offer delivery?</summary>
                        <p style={{ paddingLeft: '1rem', color: '#555' }}>We deliver within a 10km radius from our shops.</p>
                    </details>
                    <details style={{ margin: '10px 0' }}>
                        <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>What are your hours of operation?</summary>
                        <p style={{ paddingLeft: '1rem', color: '#555' }}>We're open Monday to Saturday, 7am to 7pm. Sundays 8am to 5pm.</p>
                    </details>
                    <details style={{ margin: '10px 0' }}>
                        <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Do you accommodate dietary restrictions?</summary>
                        <p style={{ paddingLeft: '1rem', color: '#555' }}>Yes, we offer gluten-free, vegan, and nut-free options. Please inform us of any allergies when ordering.</p>
                    </details>
                    <details style={{ margin: '10px 0' }}>
                        <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>How far in advance should I order for special events?</summary>
                        <p style={{ paddingLeft: '1rem', color: '#555' }}>For wedding cakes, we recommend 2-3 months. For other special events, 1-2 weeks notice is appreciated.</p>
                    </details>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default AboutPage;
