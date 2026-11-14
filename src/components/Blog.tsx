import { Link } from 'react-router-dom';
import { posts } from '../content/posts';
import '../App.css';

export default function Blog() {
    return (
        <main className="blog-page">
            <header className="site-header">
                <Link className="site-name" to="/">Mayank Agarwal</Link>
                <Link className="home-link" to="/">Home</Link>
            </header>

            <section className="blog-index">
                <p className="eyebrow">Writing</p>
                <h1>Notes from the workbench.</h1>

                <div className="post-list">
                    {posts.map((post) => (
                        <article className="post-card" key={post.slug}>
                            <div className="post-card-meta">
                                <time dateTime={post.date}>{post.displayDate}</time>
                                <span>{post.readingTime}</span>
                            </div>
                            <h2><Link to={`/blog/${post.slug}`}>{post.title}</Link></h2>
                            <p>{post.description}</p>
                            <Link className="read-more" to={`/blog/${post.slug}`}>Read article <span aria-hidden="true">→</span></Link>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}
