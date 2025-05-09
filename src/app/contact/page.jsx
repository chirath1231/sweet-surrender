import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ContactPage = () => (
    <>
        <Header />
        <main>
            <section className="contact-info">
                <h2>Contact Us</h2>
                <p>We'd love to hear from you! Whether you have a question about our products, want to place a custom order, or just want to say hello, feel free to reach out to us.</p>
                
                <div className="contact-details">
                    <div>
                        <h3>Visit Us</h3>
                        <p>123 Sweet Street<br />Bakerville, CA 91234</p>
                    </div>
                    <div>
                        <h3>Call Us</h3>
                        <p>555-123-4567</p>
                    </div>
                    <div>
                        <h3>Email Us</h3>
                        <p>
                            <a href="mailto:info@sweetsurrenderbakery.com">
                                info@sweetsurrenderbakery.com
                            </a>
                        </p>
                    </div>
                </div>
            </section>

            <section className="contact-form">
                <h2>Send us a Message</h2>
                <form action="#" method="post">
                    <div className="form-group">
                        <label htmlFor="name">Your Name</label>
                        <input type="text" id="name" name="name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Your Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" rows={5} required />
                    </div>
                    <button type="submit" className="button">Send Message</button>
                </form>
            </section>
        </main>
        <Footer />
    </>
);

export default ContactPage;
