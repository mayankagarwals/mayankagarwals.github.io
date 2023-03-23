import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css';
import Blogs from './components/Blogs';
import Home from "./components/Home"

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
