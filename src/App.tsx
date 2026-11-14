import { FaCalendar, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import backgroundImage from './assets/website_background.jpg';
import './App.css';

export default function App() {
    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
    };

    return (
        <main className="home" style={backgroundStyle}>
            <section className="overlay">
                <h1 className="intro">Hi, I&apos;m Mayank Agarwal</h1>
                <p className="remark">Slow is Smooth. Smooth is Fast</p>
                <nav className="social-icons" aria-label="Find Mayank online">
                    <a href="mailto:mayankagarwal44442@gmail.com" aria-label="Email Mayank"><FaEnvelope /></a>
                    <a href="https://www.linkedin.com/in/mayank-agarwal44442/" aria-label="Mayank on LinkedIn"><FaLinkedin /></a>
                    <a href="https://github.com/mayankagarwals" aria-label="Mayank on GitHub"><FaGithub /></a>
                    <a href="https://calendly.com/mayankagarwals" aria-label="Schedule time with Mayank"><FaCalendar /></a>
                </nav>
            </section>
            <Link className="blogs-link" to="/blog">Blogs</Link>
        </main>
    );
}

