import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import backgroundImage from './logo4.jpg';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function App () {
    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    return (
        <div style={backgroundStyle}>
            <div className="overlay">
                <h1>Hi, I'm Mayank Agarwal</h1>
                <p>I make things work</p>
                <div className="social-icons">
                    <a href="mayankagarwal44442@gmail.com"><FaEnvelope /></a>
                    <a href="https://www.linkedin.com/in/mayank-agarwal44442/"><FaLinkedin /></a>
                    <a href="https://github.com/mayankagarwals"><FaGithub /></a>
                </div>
            </div>
        </div>
    );
};

