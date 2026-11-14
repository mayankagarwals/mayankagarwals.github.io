import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import { getPost } from '../content/posts';
import '../App.css';

export default function Post() {
    const { slug } = useParams();
    const post = getPost(slug);
    const [content, setContent] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!post) {
            return;
        }

        const controller = new AbortController();
        const contentUrl = `${process.env.PUBLIC_URL}/posts/${post.filename}`;

        fetch(contentUrl, { signal: controller.signal })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Could not load ${post.filename}`);
                }
                return response.text();
            })
            .then(setContent)
            .catch((fetchError) => {
                if (fetchError.name !== 'AbortError') {
                    setError(true);
                }
            });

        return () => controller.abort();
    }, [post]);

    if (!post) {
        return (
            <main className="blog-page not-found">
                <h1>That post isn&apos;t here.</h1>
                <Link to="/blog">Back to writing</Link>
            </main>
        );
    }

    return (
        <main className="blog-page">
            <header className="site-header">
                <Link className="site-name" to="/">Mayank Agarwal</Link>
                <Link className="home-link" to="/blog">Writing</Link>
            </header>

            <article className="article">
                <Link className="back-link" to="/blog">← All writing</Link>
                <header className="article-header">
                    <p className="eyebrow"><time dateTime={post.date}>{post.displayDate}</time> · {post.readingTime}</p>
                    <h1>{post.title}</h1>
                    <p className="article-description">{post.description}</p>
                </header>

                {error && <p className="content-error">The article could not be loaded. Please try again.</p>}
                {!error && !content && <p className="loading-copy">Loading article…</p>}
                {content && (
                    <div className="article-content">
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </div>
                )}
            </article>
        </main>
    );
}
