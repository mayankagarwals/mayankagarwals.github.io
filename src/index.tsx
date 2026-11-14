import { createHashRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import Blog from './components/Blog';
import Post from './components/Post';

const router = createHashRouter([
    { path: '/', element: <App /> },
    { path: '/blog', element: <Blog /> },
    { path: '/blog/:slug', element: <Post /> },
    { path: '*', element: <Blog /> },
]);

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
