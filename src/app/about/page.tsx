import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AboutPage = () => (
    <>
        <Header />
        <main>
            <section className="about-us">
                <h2>About Sweet Surrender Bakery</h2>
                <p>Welcome to Sweet Surrender Bakery, where passion for baking and the finest ingredients...</p>
                <div className="team-members">
                    <div className="team-member">
                        <img src="/images/placeholder-baker1.svg" alt="Baker 1" />
                        <h3>Emily</h3>
                        <p>Head Baker & Founder</p>
                    </div>
                    <div className="team-member">
                        <img src="/images/placeholder-baker2.svg" alt="Baker 2" />
                        <h3>David</h3>
                        <p>Pastry Chef</p>
                    </div>
                </div>
            </section>
        </main>
        <Footer />
    </>
);

export default AboutPage;
